import React, {useState} from 'react';
import parse from 'html-react-parser';
import DetailsSkeleton from "../../skeletons/details-skeleton.jsx";
import ProductStore from "../../stores/ProductStore.js";
import ProductImage from "./productImage.jsx";
import Reviews from "./reviews.jsx";

const Details = () => {

    const {ProductDetails} = ProductStore();

    const [qty, setQty] = useState(1);

    const qtyIncrement = () => {
        setQty(qty => qty + 1);
    }

    const qtyDecrement = () => {
        if(qty > 1){
            setQty(qty => qty - 1);
        }
    }

    if( ProductDetails === null ){
        return <DetailsSkeleton/>
    }else{
        return (
            <div>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-md-7 p-3">
                            <ProductImage/>
                        </div>
                        <div className="col-md-5 p-3">
                            <h4>{ProductDetails[0]['title']}</h4>
                            <p className="text-muted bodySmal my-1">Category: {ProductDetails[0]['category']['categoryName']}</p>
                            <p className="text-muted bodySmal my-1">Brand: {ProductDetails[0]['brand']['brandName']}</p>
                            <p className="bodySmal mb-2 mt-1">{ProductDetails[0]['shortDes']}</p>
                            <span>
                                {ProductDetails[0]['discount'] === true ?
                                    (
                                        <span className="bodyXLarge">Price: <strike class="text-secondary">${ProductDetails[0]['price']}</strike> ${ProductDetails[0]['discountPrice']} </span>
                                    ) :
                                    (
                                        <span className="bodyXLarge"> ${ProductDetails[0]['price']} </span>
                                    )
                                }

                            </span>
                            <div className="row">
                                <div className="col-4 p-2">
                                    <label className="bodySmal">Size</label>
                                    <select className="form-control my-2 form-select">
                                        <option value="">Size</option>
                                        {
                                            ProductDetails[0]['details']['size'].split(',').map((item)=>{
                                                return (
                                                    <option value={item}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="bodySmal">Color</label>
                                    <select className="form-control my-2 form-select">
                                        <option value="">Color</option>
                                        {
                                            ProductDetails[0]['details']['color'].split(',').map((item)=>{
                                                return (
                                                    <option value={item}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="bodySmal">Quantity</label>
                                    <div className="input-group my-2">
                                        <button onClick={qtyDecrement} className="btn btn-outline-secondary">-</button>
                                        <input value={qty} type="text" className="form-control bg-light text-center" readOnly/>
                                        <button onClick={qtyIncrement} className="btn btn-outline-secondary">+</button>
                                    </div>
                                </div>
                                <div className="col-4 p-2">
                                    <button className="btn w-100 btn-success">Add to Cart</button>
                                </div>
                                <div className="col-4 p-2">
                                    <button className="btn w-100 btn-success">Add to Wish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="Speci-tab" data-bs-toggle="tab"
                                        data-bs-target="#Speci-tab-pane" type="button" role="tab"
                                        aria-controls="Speci-tab-pane" aria-selected="true">Specifications
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="Review-tab" data-bs-toggle="tab"
                                        data-bs-target="#Review-tab-pane" type="button" role="tab"
                                        aria-controls="Review-tab-pane" aria-selected="false">Review
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel"
                                 aria-labelledby="Speci-tab" tabIndex="0">
                                {
                                    parse(ProductDetails[0]['details']['des'])
                                }
                            </div>
                            <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel" aria-labelledby="Review-tab"
                                 tabIndex="0">
                                <Reviews/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default Details;