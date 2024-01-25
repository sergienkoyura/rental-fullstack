import { useEffect, useState } from "react";
import ItemModel from "../../../models/ItemModel";
import { useOktaAuth } from "@okta/okta-react";
export const ChangeQuantityOfItem: React.FC<{ item: ItemModel, deleteItem: any }> = (props) => {

    const { authState } = useOktaAuth();

    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);

    useEffect(() => {
        const fetchItemInState = () => {
            props.item.copies ? setQuantity(props.item.copies) : setQuantity(0);
            props.item.copiesAvailable ? setRemaining(props.item.copiesAvailable) : setRemaining(0);
        }

        fetchItemInState();
    }, []);


    async function increaseQuantity() {
        const url: string = `${process.env.REACT_APP_API}/admin/secure/item-quantity/increase?itemId=${props.item.id}`;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const requestResponse = await fetch(url, requestOptions);
        if (!requestResponse.ok) {
            throw new Error("Something went wrong");
        }
        setQuantity(quantity + 1);
        setRemaining(remaining + 1);
    }

    async function decreaseQuantity() {
        const url: string = `${process.env.REACT_APP_API}/admin/secure/item-quantity/decrease?itemId=${props.item.id}`;
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const requestResponse = await fetch(url, requestOptions);
        if (!requestResponse.ok) {
            throw new Error("Something went wrong");
        }
        setQuantity(quantity - 1);
        setRemaining(remaining - 1);
    }

    return (
        <div className="card  mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
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
                        <h5 className="card-title">{props.item.admin}</h5>
                        <h4>{props.item.title}</h4>
                        <p className="card-text">{props.item.description}</p>
                    </div>
                </div>
                <div className="mt-3 col-md-4">
                    <div className="d-flex justify-content-center align-itens-center">
                        <p>Total quantity: <b>{quantity}</b></p>
                    </div>
                    <div className="d-flex justify-content-center align-itens-center">
                        <p>Items remaining: <b>{remaining}</b></p>
                    </div>
                </div>
                <div className="d-inline mt-3">
                    <button onClick={() => props.deleteItem(props.item.id)} className="m-1 btn btn-md btn-danger">Delele</button>
                    <button onClick={() => increaseQuantity()} className="m-1 btn-md btn main-color text-white">Add Quantity</button>
                    <button onClick={() => decreaseQuantity()} className="m-1 btn-md btn btn-warning">Decrease Quantity</button>
                </div>
            </div>
        </div>

    );
}