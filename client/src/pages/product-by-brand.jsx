import React, {useEffect} from 'react';
import ProductStore from "../stores/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../components/layout/layout.jsx";
import ProductLists from "../components/product/product-lists.jsx";

const ProductByBrand = () => {

    const {ProductListByBrandRequest} = ProductStore();
    const {id} = useParams();

    useEffect(() => {
        (async ()=>{
            await ProductListByBrandRequest(id);
        })()
    }, [id]);

    return (
        <Layout>
            <ProductLists/>
        </Layout>
    );
};

export default ProductByBrand;