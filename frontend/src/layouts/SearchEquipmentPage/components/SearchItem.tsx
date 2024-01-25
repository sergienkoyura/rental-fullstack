import { Link } from "react-router-dom";
import ItemModel from "../../../models/ItemModel";

export const SearchItem: React.FC<{ item: ItemModel }> = (props) => {
    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="g-0 row">
                <div className="col-md-2">
                    <div className="d-none d-lg-flex justify-content-center">
                        {props.item.img ?
                            <img
                                src={"data:image/jpeg;base64," + props.item.img.data}
                                width={123}
                                height={196}
                                alt="item"
                            />
                            :
                            <img
                            src={require('./../../../Images/Images/primary.jpg')}
                                width={123}
                                height={196}
                                alt="item"
                            />
                        }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        {props.item.img ?
                            <img
                                src={"data:image/jpeg;base64," + props.item.img.data}
                                width={123}
                                height={196}
                                alt="item"
                            />
                            :
                            <img
                                src={require('./../../../Images/Images/primary.jpg')}
                                width={123}
                                height={196}
                                alt="item"
                            />
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">
                            {props.item.admin}
                        </h5>
                        <h4>
                            {props.item.title}
                        </h4>
                        <p className="card-text">
                            {props.item.description}
                        </p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <Link className="btn btn-md main-color text-white" to={`/checkout/${props.item.id}`}>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}