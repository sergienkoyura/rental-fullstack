import { Link } from "react-router-dom"

export const ExploreTopItems = () => {
    return (
        <div className="p-5 mb-4 bg-dark header">
            <div className="container-fluid py-5 text-white 
            d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="display-5 fw-bold">Gear Up and Get Going</h1>
                    <p className="col-md-10 fs-4">What would you like to get next?</p>
                    <Link type="button" className="btn main-color btn-lg text-white" to={'/search'}>
                        Explore top items
                    </Link>
                </div>
            </div>
        </div>
    )
}