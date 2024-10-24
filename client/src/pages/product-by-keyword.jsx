import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import {useParams} from "react-router-dom";
import ProductStore from "../stores/ProductStore.js";
import ProductLists from "../components/product/product-lists.jsx";

const ProductByKeyword = () => {

    const {ProductListByKeywordRequest} = ProductStore();
    const {keyword} = useParams();

    useEffect(() => {
        (async ()=>{
            await ProductListByKeywordRequest(keyword);
        })()
    }, [keyword]);

    return (
        <Layout>
            <ProductLists/>
        </Layout>
    );
};

export default ProductByKeyword;