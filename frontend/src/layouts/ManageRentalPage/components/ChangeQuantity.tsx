import { useEffect, useState } from "react";
import ItemModel from "../../../models/ItemModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ChangeQuantityOfItem } from "./ChangeQuantityOfItem";
import { useOktaAuth } from "@okta/okta-react";

export const ChangeQuantity = () => {

    const { authState } = useOktaAuth();

    const [items, setItems] = useState<ItemModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [state, setState] = useState(false);


    useEffect(() => {
        const fetchItems = async () => {

            const url: string = `${process.env.REACT_APP_API}/items?page=${currentPage - 1}&size=${itemsPerPage}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.items;

            const loadedItems: ItemModel[] = [];
            for (const key in responseData) {
                loadedItems.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    admin: responseData[key].admin,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img
                })
            }

            setTotalAmountOfItems(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);
            setItems(loadedItems);
            setIsLoading(false);
        };

        fetchItems().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })

        window.scrollTo(0, 0);
    }, [currentPage, state]);


    if (isLoading) {
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


    async function deleteItem(key: string) {
        const url: string = `${process.env.REACT_APP_API}/admin/secure/delete-item?itemId=${key}`;
        const requestOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const requestResponse = await fetch(url, requestOptions);
        if (!requestResponse.ok) {
            throw new Error("Something went wrong");
        }
        setState(!state);
    }


    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    let lastItem = itemsPerPage * currentPage <= totalAmountOfItems ? itemsPerPage * currentPage : totalAmountOfItems;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container mt-5">
            {totalAmountOfItems > 0 ?
                <>
                    <div className="mt-3">
                        <h3>Number of results: {totalAmountOfItems}</h3>
                    </div>
                    <p>{indexOfFirstItem + 1} to {lastItem} of {totalAmountOfItems} items:</p>
                    {items.map(item => (
                        <ChangeQuantityOfItem key={item.id} item={item} deleteItem={deleteItem}/>
                    ))

                    }
                </>
                :
                <h5>Add a item first</h5>
            }
            {totalPages > 1 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }
        </div>
    );
}