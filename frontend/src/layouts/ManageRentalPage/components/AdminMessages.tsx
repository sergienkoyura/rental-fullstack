import { useOktaAuth } from "@okta/okta-react"
import { useEffect, useState } from "react";
import MessageModel from "../../../models/MessageModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Pagination } from "../../Utils/Pagination";
import { AdminMessage } from "./AdminMessage";
import AdminMessageRequest from "../../../models/AdminMessageRequest";

export const AdminMessages = () => {
    const { authState } = useOktaAuth();

    // Normal loading pieces
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Messages endpoint state
    const [messages, setMessages] = useState<MessageModel[]>([]);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    //Recall useEffect
    const [btnSubmit, setBtnSubmit] = useState(false);

    useEffect(() => {
        const fetchUserMessages = async () => {
            const url = `${process.env.REACT_APP_API}/messages/search/findByClosed?closed=false&page=${currentPage - 1}&size=5`;
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            };

            const messageResponse = await fetch(url, requestOptions);
            if(!messageResponse.ok){
                throw new Error('Something went wrong');
            }
            const messageResponseJson = await messageResponse.json();

            setMessages(messageResponseJson._embedded.messages);
            setTotalPages(messageResponseJson.page.totalPages);
            setIsLoadingMessages(false);
        }
        fetchUserMessages().catch((error: any) => {
            setIsLoadingMessages(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, currentPage, btnSubmit]);

    if (isLoadingMessages) {
        return <SpinnerLoading />
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }


    async function submitResponseToQuestion(id: string, response: string){
        const url = `${process.env.REACT_APP_API}/messages/secure/admin/message`;
        if(authState && authState.isAuthenticated && id != null && response !== ''){
            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(id, response);
            const requestOptions = {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageAdminRequestModel)
            }

            const messageAdminRequestModelResponse = await fetch(url, requestOptions);
            if(!messageAdminRequestModelResponse.ok){
                throw new Error("Something went wrong!");
            }
            setBtnSubmit(!btnSubmit);
        }
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="mt-3">
            {messages.length > 0 ?
                <>
                <h5>Pending Q/A:</h5>
                {
                    messages.map(message => (
                        <AdminMessage message={message} key={message.id} submitResponseToQuestion={submitResponseToQuestion}/>
                    ))
                }
                </>    
                :
                <h5>No pending Q/A</h5>
        }
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}