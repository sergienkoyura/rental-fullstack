import { useEffect, useState } from "react";
import ItemModel from "../../models/ItemModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchItem } from "./components/SearchItem";
import { Pagination } from "../Utils/Pagination";

export const SearchEquipmentPage = () => {

    const [items, setItems] = useState<ItemModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalAmountOfItems, setTotalAmountOfItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');

    const [categorySelection, setCategorySelection] = useState('Item category');

    useEffect(() => {
        const fetchItems = async () => {

            const baseUrl: string = `${process.env.REACT_APP_API}/items`;

            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${itemsPerPage}`;
            }
            else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`)
                url = baseUrl + searchWithPage;
            }

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
    }, [currentPage, searchUrl]);

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

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContainingIgnoreCase?title=${search}&page=<pageNumber>&size=${itemsPerPage}`)
        }
        setCategorySelection('Item category');
    }

    const categoryField = (value: string) => {
        setCurrentPage(1);
        setCategorySelection(value);
        if (value !== 'All') {
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${itemsPerPage}`)
            console.log(searchUrl)
        } else {
            setSearchUrl(`?page=<pageNumber>&size=${itemsPerPage}`)
        }

    }

    const resetSearch = () => {
        var searchInput = document.getElementById("searchInput") as HTMLInputElement;
        if (searchInput)
            searchInput.value = '';
        setSearch('');
    }


    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    let lastItem = itemsPerPage * currentPage <= totalAmountOfItems ? itemsPerPage * currentPage : totalAmountOfItems;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input id="searchInput" className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                    onChange={e => setSearch(e.target.value)}/>
                                <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {categorySelection}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" onClick={() => resetSearch()}>
                                    <li onClick={() => categoryField('Strength')}>
                                        <a className="dropdown-item">
                                            Strength
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Workout')}>
                                        <a className="dropdown-item">
                                            Workout
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Body Balance')}>
                                        <a className="dropdown-item">
                                            Body Balance
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Fitness')}>
                                        <a className="dropdown-item">
                                            Fitness
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfItems > 0 ?
                        <>
                            <div className="mt-3">
                                <h5>Number of results: ({totalAmountOfItems})</h5>
                            </div>
                            <p>
                                {indexOfFirstItem + 1} to {lastItem} of {totalAmountOfItems} items:
                            </p>
                            {items.map(item => (
                                <SearchItem item={item} key={item.id} />
                            ))}
                        </>
                        :
                        <div className="m-5">
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            <a type="button" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white" href="#">
                                Rental Services
                            </a>
                        </div>
                    }

                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
}