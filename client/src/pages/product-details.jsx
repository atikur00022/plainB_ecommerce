import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import Details from "../components/product/details.jsx";
import ProductStore from "../stores/ProductStore.js";
import Brands from "../components/product/brands.jsx";
import {useParams} from "react-router-dom";

const ProductDetails = () => {

    const {ProductDetailsRequest,ProductReviewRequest,BrandListRequest,BrandList} = ProductStore();
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            await ProductDetailsRequest(id);
            await ProductReviewRequest(id);
            BrandList === null ? await BrandListRequest() : null;
        })()
    }, []);

    return (
        <Layout>
            <Details/>
            <Brands/>
        </Layout>
    );
};

export default ProductDetails;