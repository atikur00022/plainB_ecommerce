import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import Slider from "../components/product/slider.jsx";
import Features from "../components/features/features.jsx";
import Categories from "../components/product/categories.jsx";
import Products from "../components/product/products.jsx";
import Brands from "../components/product/brands.jsx";
import FeatureStore from "../stores/FeatureStore.js";
import ProductStore from "../stores/ProductStore.js";


const HomePage = () => {

    const {BrandListRequest,CategoryListRequest,SliderListRequest,ProductListByRemarkRequest} = ProductStore();
    const {FeatureListRequest} = FeatureStore();

    useEffect(()=>{
        (async ()=>{
            await SliderListRequest();
            await FeatureListRequest();
            await CategoryListRequest();
            await ProductListByRemarkRequest("new");
            await BrandListRequest();
        })()
    },[]);

    return (
        <Layout>
            <Slider/>
            <Features/>
            <Categories/>
            <Products/>
            <Brands/>
        </Layout>
    );
};

export default HomePage;