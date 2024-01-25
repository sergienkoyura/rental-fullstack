import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import HistoryModel from "../../../models/HistoryModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";
import { Link } from "react-router-dom";

export const HistoryPage = () => {

    const { authState } = useOktaAuth();

    const [httpError, setHttpError] = useState(null);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);

    const [histories, setHistories] = useState<HistoryModel[]>([]);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        const fetchUserHistory = async () => {
            if (authState && authState.isAuthenticated) {
                const reviewUrl: string = `${process.env.REACT_APP_API}/histories/search/findItemsByUserEmail?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage - 1}&size=5`;
                const responseReviews = await fetch(reviewUrl);
                if (!responseReviews.ok) {
                    throw new Error("Something went wrong!");
                }
                const responseJsonHistories = await responseReviews.json();
                setHistories(responseJsonHistories._embedded.histories);
                setTotalPages(responseJsonHistories.page.totalPages);

            }
            setIsLoadingHistory(false);
        };

        fetchUserHistory()
            .catch((error: any) => {
                setIsLoadingHistory(false);
                setHttpError(error.message);
            });
        window.scrollTo(0, 0);
    }, [authState, currentPage]);

    if (isLoadingHistory) {
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

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="mt-2">
            {histories.length > 0 ?
                <>
                    <h5>Recent History:</h5>
                    {histories.map(history => (
                        <div key={history.id}>
                            <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                                <div className="row g-0">
                                    <div className="col-md-2">
                                        <div className="d-none d-lg-flex justify-content-center">
                                            {history.img ?
                                                <img src={"data:image/jpeg;base64," + history.img.data} width={123} height={196} alt="Item" />
                                                :
                                                <img src={require('./../../../Images/Images/primary.jpg')} width={123} height={196} alt="Item" />
                                            }
                                        </div>
                                        <div className="d-lg-none d-flex justify-content-center align-content-center">
                                            {history.img ?
                                                <img src={"data:image/jpeg;base64," + history.img.data} width={123} height={196} alt="Item" />
                                                :
                                                <img src={require('./../../../Images/Images/primary.jpg')} width={123} height={196} alt="Item" />
                                            }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card-body">
                                            <h5 className="card-title">{history.admin}</h5>
                                            <h4>{history.title}</h4>
                                            <p className="card-text">{history.description}</p>
                                            <hr />
                                            <p className="card-text"> Checked out on: {history.checkoutDate}</p>
                                            <p className="card-text"> Returned on: {history.returnedDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))

                    }
                </>
                :
                <>
                    <h4 className="mt-3">Currently no history.. </h4>
                    <Link className="btn btn-primary" to={"/search"}>Search for a new item</Link>
                </>
            }

            {totalPages > 1 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }
        </div>
    );
}