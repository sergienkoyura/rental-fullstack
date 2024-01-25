import { Link } from "react-router-dom";
import ItemModel from "../../../models/ItemModel";
import { LeaveAReview } from "../../Utils/LeaveAReview";

export const CheckoutAndReviewBox: React.FC<{
    item: ItemModel | undefined, mobile: boolean, loansCount: number,
    isAuthenticated: any, isCheckedOut: boolean, checkoutItem: any, isReviewLeft: boolean,
    submitReview: any
}> = (props) => {

    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckedOut && props.loansCount < 5) {
                return (<button onClick={() => props.checkoutItem()} className="btn btn-success btn-lg">Checkout</button>)
            } else if (props.isCheckedOut) {
                return (<p><b>Item is checked out. Enjoy!</b></p>)
            } else if (!props.isCheckedOut) {
                return (<p className="text-danger">Too many items checked out.</p>)
            }
        }
        return (<Link to={"/login"} className="btn btn-success btn-lg">Sign in</Link>)
    }

    function reviewRender() {
        if (props.isAuthenticated) {
            if (props.isReviewLeft) {
                return (<p><b>Thanks for your review!</b></p>);
            } else {
                return (<LeaveAReview submitReview={props.submitReview}/>)
            }
        } else {
            return (<p>Sign in to be able to leave a review.</p>);
        }
    }

    return (
        <div className={props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.loansCount}/5</b> items checked out
                    </p>
                    <hr />
                    {props.item && props.item.copiesAvailable && props.item.copiesAvailable > 0 ?
                        <h4 className="text-success">
                            Available
                        </h4>
                        :
                        <h4 className="text-danger">
                            Wait List
                        </h4>
                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.item?.copies}</b> copies
                        </p>
                        <p className="col-6 lead">
                            <b>{props.item?.copiesAvailable}</b> available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className="mt-3">
                    This number can change until placing order has been complete.
                </p>
                {reviewRender()}
            </div>
        </div>
    );
}