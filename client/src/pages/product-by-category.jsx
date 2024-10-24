import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import ProductLists from "../components/product/product-lists.jsx";
import ProductStore from "../stores/ProductStore.js";
import {useParams} from "react-router-dom";

const ProductByCategory = () => {

    const {ProductListByCategoryRequest} = ProductStore();
    const {id} = useParams();

    useEffect(() => {
        (async ()=>{
            await ProductListByCategoryRequest(id);
        })()
    }, [id]);

    return (
        <Layout>
            <ProductLists/>
        </Layout>
    );
};

export default ProductByCategory;