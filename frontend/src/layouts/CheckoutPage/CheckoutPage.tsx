import { useEffect, useState } from "react";
import ItemModel from "../../models/ItemModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./components/CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./components/LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import { error } from "console";
import ReviewRequestModel from "../../models/ReviewRequestModel";
import { Link } from "react-router-dom";

export const CheckoutPage = () => {
    const { authState } = useOktaAuth();

    const [item, setItem] = useState<ItemModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([])
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    // Loans count State
    const [loansCount, setLoansCount] = useState(0);
    const [isLoadingLoansCount, setisLoadingLoansCount] = useState(true);

    // Is item checked out?
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingItemCheckedOut, setIsLoadingItemCheckedOut] = useState(true);

    const [displayError, setDisplayError] = useState(false);

    const itemId = (window.location.pathname).split('/')[2];

    //item info
    useEffect(() => {

        window.scrollTo(0, 0);
        const fetchItem = async () => {
            const url: string = `${process.env.REACT_APP_API}/items/${itemId}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const loadedItem: ItemModel = {
                id: responseJson.id,
                title: responseJson.title,
                admin: responseJson.admin,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            };
            setItem(loadedItem);
            setIsLoading(false);
        };
        fetchItem().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [isCheckedOut]);

    //reviews
    useEffect(() => {
        const fetchItemReviews = async () => {
            const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByItemId?itemId=${itemId}`;
            const responseReviews = await fetch(reviewUrl);
            if (!responseReviews.ok) {
                throw new Error("Something went wrong!");
            }
            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;
            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;
            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    item_id: responseData[key].itemId,
                    reviewDescription: responseData[key].reviewDescription
                })
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews.length > 0) {
                const round = (Math.round(weightedStarReviews / loadedReviews.length * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchItemReviews()
            .catch((error: any) => {
                setIsLoadingReview(false);
                setHttpError(error.message);
            });
    }, [isReviewLeft]);

    //loanCount
    useEffect(() => {
        const fetchUserLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/items/secure/current-loans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
                const loansCountResponse = await fetch(url, requestOptions);
                if (!loansCountResponse.ok) {
                    throw new Error("Something went wrong");
                }
                const loansCountResponseJson = await loansCountResponse.json();
                setLoansCount(loansCountResponseJson);
            }
            setisLoadingLoansCount(false);
        }
        fetchUserLoansCount().catch((error: any) => {
            setisLoadingLoansCount(false);
            setHttpError(error.message);
        })
    }, [isCheckedOut, authState]);

    //isCheckedOut
    useEffect(() => {
        const fetchUserCheckedOut = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/items/secure/is-checked-out?itemId=${itemId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }

                const itemCheckedOut = await fetch(url, requestOptions);
                if (!itemCheckedOut.ok) {
                    throw new Error("Something went wrong");
                }
                const itemCheckedOutJson = await itemCheckedOut.json();
                setIsCheckedOut(itemCheckedOutJson);
            }
            setIsLoadingItemCheckedOut(false);
        }

        fetchUserCheckedOut().catch((error: any) => {
            setIsLoadingItemCheckedOut(false);
            setHttpError(error.message);
        })
    }, [authState]);

    //review left by user
    useEffect(() => {
        const fetchUserReviewItem = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `${process.env.REACT_APP_API}/reviews/secure/item?itemId=${itemId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }

                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) {
                    throw new Error("Something went wrong");
                }
                const userReviewJson = await userReview.json();
                setIsReviewLeft(userReviewJson);
            }
            setIsLoadingUserReview(false);
        }

        fetchUserReviewItem().catch((error: any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        })
    }, [authState, isReviewLeft]);


    if (isLoading || isLoadingReview || isLoadingLoansCount || isLoadingItemCheckedOut || isLoadingUserReview) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    async function checkoutItem() {
        const url = `${process.env.REACT_APP_API}/items/secure/checkout?itemId=${item?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        }

        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            setDisplayError(true);
        } else {
            setDisplayError(false);
            setIsCheckedOut(true);
        }
    }

    async function submitReview(starInput: number, reviewDescription: string) {
        let itemId: string = '';
        if (item?.id) {
            itemId = item.id;
        }

        const reviewRequestModel = new ReviewRequestModel(starInput, itemId, reviewDescription);
        const url = `${process.env.REACT_APP_API}/reviews/secure`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        }

        const theResponse = await fetch(url, requestOptions);
        if (!theResponse.ok) {
            throw new Error("Something went wrong");
        }
        setIsReviewLeft(true);
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                {displayError &&
                    <div className="alert alert-danger mt-3" role="alert">
                        Please pay <Link to={"/fees"}>outstanding fees</Link> and/or <Link to={"/loans"}>return late item(s)</Link>
                    </div>
                }
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {item?.img ?
                            <img src={"data:image/jpeg;base64," + item?.img.data} width={226} height={349} alt="item" />
                            :
                            <img src={'./../../Images/ItemsImages/primary.png'} width={226} height={349} alt="item" />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{item?.title}</h2>
                            <h5 className="text-primary">{item?.admin}</h5>
                            <p className="lead">{item?.description}</p>
                            <StarsReview
                                rating={totalStars} size={32}
                            />
                        </div>
                    </div>
                    <CheckoutAndReviewBox item={item} mobile={false} loansCount={loansCount} isAuthenticated={authState?.isAuthenticated}
                        isCheckedOut={isCheckedOut} checkoutItem={checkoutItem} isReviewLeft={isReviewLeft} submitReview={submitReview} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} itemId={item?.id} mobile={false} />
            </div>
            <div className="container d-lg-none mt-5">
                {displayError &&
                    <div className="alert alert-danger mt-3" role="alert">
                        Please pay outstanding feed and/or return late item(s)
                    </div>
                }
                <div className="d-flex justify-content-center align-items-center">
                    {item?.img ?
                        <img src={"data:image/jpeg;base64," + item?.img.data} width={226} height={349} alt="item" />
                        :
                        <img src={'./../../Images/ItemsImages/primary.png'} width={226} height={349} alt="item" />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{item?.title}</h2>
                        <h5 className="text-primary">{item?.admin}</h5>
                        <p className="lead">{item?.description}</p>
                        <StarsReview
                            rating={totalStars} size={32}
                        />
                    </div>
                </div>
                <CheckoutAndReviewBox item={item} mobile={true} loansCount={loansCount} isAuthenticated={authState?.isAuthenticated}
                    isCheckedOut={isCheckedOut} checkoutItem={checkoutItem} isReviewLeft={isReviewLeft} submitReview={submitReview} />
                <hr />
                <LatestReviews reviews={reviews} itemId={item?.id} mobile={true} />
            </div>
        </div>
    );
}