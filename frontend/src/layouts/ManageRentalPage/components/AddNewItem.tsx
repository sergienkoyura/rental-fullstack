import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import ItemRequestModel from "../../../models/ItemRequestModel";

export const AddNewItem = () => {
    const { authState } = useOktaAuth();

    //item
    const [title, setTitle] = useState('');
    const [admin, setAdmin] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('Category');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    //displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string) {
        setCategory(value);
    }

    async function base64Convertion(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedImage(reader.result?.toString().replace("data:image/jpeg;base64,", ""));
        }
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    async function submitNewItem() {
        const url = `${process.env.REACT_APP_API}/admin/secure/add-item`;
        if (authState?.isAuthenticated
            && title !== '' && admin !== '' && category !== 'Category' && description !== '' && copies >= 0 && selectedImage !== null) {
            const item: ItemRequestModel = new ItemRequestModel(title, admin, description, copies, category, selectedImage);
            console.log(item)
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            };

            const submitNewItemResponse = await fetch(url, requestOptions);
            if (!submitNewItemResponse.ok) {
                throw new Error("Something went wrong");
            }
            setTitle('');
            setAdmin('');
            setDescription('');
            setCopies(0);
            setCategory('Category');
            setSelectedImage(null);
            setDisplaySuccess(true);
            setDisplayWarning(false);
        } else {
            setDisplaySuccess(false);
            setDisplayWarning(true);
        }
    }

    return (
        <div className="container mt-5 mb-5">
            {displaySuccess &&
                <div className="alert alert-success" role="alert">
                    Item added successfully
                </div>
            }
            {displayWarning &&
                <div className="alert alert-danger" role="alert">
                    All fields must be filled out
                </div>
            }
            <div className="card">
                <div className="card-header">

                </div>
                <div className="card-body">
                    <form method="POST">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" required onChange={e => setTitle(e.target.value)} value={title} />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Admin</label>
                                <input type="text" className="form-control" name="admin" required onChange={e => setAdmin(e.target.value)} value={admin} />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Category</label>
                                <button className="form-control btn btn-secondary dropdown-toggle" type="button"
                                    id="dropdownMenuButton1" data-bs-toggle='dropdown' aria-expanded='false'>
                                    {category}
                                </button>
                                <ul id="addNewItemId" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
                        <div className="col-md-12 mb-3">
                            <label className="form-label"> Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label"> Copies</label>
                            <input type="number" className="form-control" name="copies" required
                                onChange={e => setCopies(Number(e.target.value))} value={copies}></input>
                        </div>
                        <input type="file" onChange={e => base64Convertion(e)} accept="image/jpeg" />
                        <div>
                            <button onClick={submitNewItem} type="button" className="btn btn-primary mt-3">
                                Add item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}