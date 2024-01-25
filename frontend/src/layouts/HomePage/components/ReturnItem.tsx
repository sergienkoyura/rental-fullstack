import React from 'react';
import ItemModel from '../../../models/ItemModel';
import { Link } from 'react-router-dom';

export const ReturnItem: React.FC<{item: ItemModel}> = (props) => {

    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {props.item.img ? 
                    <img
                        src={"data:image/jpeg;base64," + props.item.img.data}
                        width={151}
                        height={233}
                        alt="item"
                    />
                    :
                    <img
                        src={require('./../../../Images/Images/primary.jpg')}
                        width={151}
                        height={233}
                        alt="item"
                    />
                }
                <h6 className="mt-2">{props.item.title}</h6>
                <p>{props.item.admin}</p>
                <Link className="btn main-color text-white" to={'/checkout/' + props.item.id}>Reserve</Link>
            </div>
        </div>
    );
}