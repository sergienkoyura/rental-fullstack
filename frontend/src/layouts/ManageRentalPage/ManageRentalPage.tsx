import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AdminMessages } from "./components/AdminMessages";
import { AddNewItem } from "./components/AddNewItem";
import { ChangeQuantity } from "./components/ChangeQuantity";

export const ManageRentalPage = () => {
    const { authState } = useOktaAuth();
    const [changeQuantityOfItemsClick, setChangeQuantityOfItemsClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);

    function addItemClickFunction() {
        setChangeQuantityOfItemsClick(false);
        setMessagesClick(false);
    }

    function changeQuantityOfItemsClickFunction() {
        setChangeQuantityOfItemsClick(true);
        setMessagesClick(false);
    }

    function messagesClickFunction() {
        setChangeQuantityOfItemsClick(false);
        setMessagesClick(true);
    }

    if(authState?.accessToken?.claims.userType === undefined){
        return <Redirect to={"/home"}/>
    }

    return (
        <div className="container">
            <div className="mt-5">
                <h3>Manage Equipment</h3>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button onClick={() => addItemClickFunction()} className="nav-link active" id="nav-add-item-tab" data-bs-toggle='tab'
                            data-bs-target="#nav-add-item" type="button" role="tab" aria-controls='nav-add-item'
                            aria-selected='true'>
                            Add new item
                        </button>
                        <button onClick={() => changeQuantityOfItemsClickFunction()} className="nav-link" id="nav-quantity-tab" data-bs-toggle='tab'
                            data-bs-target="#nav-quantity" type="button" role="tab" aria-controls='nav-quantity'
                            aria-selected='false'>
                            Change quantity
                        </button>
                        <button onClick={() => messagesClickFunction()} className="nav-link" id="nav-messages-tab" data-bs-toggle='tab'
                            data-bs-target="#nav-messages" type="button" role="tab" aria-controls='nav-messages'
                            aria-selected='false'>
                            Messages
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tab-content">
                    <div className="tab-pane fade show active" id="nav-add-item" role="tabpanel"
                        aria-labelledby="nav-add-item-tab">
                        <AddNewItem/>
                    </div>
                    <div className="tab-pane fade" id="nav-quantity" role="tabpanel"
                        aria-labelledby="nav-quantity-tab">
                        {changeQuantityOfItemsClick ? <ChangeQuantity/> : <></>}
                    </div>
                    <div className="tab-pane fade" id="nav-messages" role="tabpanel"
                        aria-labelledby="nav-messages-tab">
                        {messagesClick ? <AdminMessages/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}