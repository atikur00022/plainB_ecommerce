import { create } from 'zustand'
import axios from "axios";


const ProductStore = create((set)=> ({
    BrandList: null,
    BrandListRequest: async () => {
        let res = await axios.get(`/api/BrandList`);
        if(res.data['status'] === 'success'){
            set({BrandList: res.data['data']});
        }
    },

    CategoryList: null,
    CategoryListRequest: async () => {
        let res = await axios.get(`/api/CategoriesLists`);
        if(res.data['status'] === 'success'){
            set({CategoryList: res.data['data']});
        }
    },

    SliderList: null,
    SliderListRequest: async () => {
        let res = await axios.get(`/api/ProductListBySlider`);
        if(res.data['status'] === 'success'){
            set({SliderList: res.data['data']});
        }
    },

    ProductListByRemark: null,
    ProductListByRemarkRequest: async (Remark) => {
        // set({ProductListByRemark:null})
        let res = await axios.get(`/api/ProductListByRemark/${Remark}`);
        if(res.data['status'] === 'success'){
            set({ProductListByRemark: res.data['data']});
        }
    },

    ProductList: null,
    ProductListByBrandRequest: async (BrandID) => {
        set({ProductList:null})
        let res = await axios.get(`/api/ProductListByBrand/${BrandID}`);
        if(res.data['status'] === 'success'){
            set({ProductList: res.data['data']});
        }
    },

    ProductListByCategoryRequest: async (CategoryID) => {
        set({ProductList:null})
        let res = await axios.get(`/api/ProductListByCategory/${CategoryID}`);
        if(res.data['status'] === 'success'){
            set({ProductList: res.data['data']});
        }
    },

    ProductListByKeywordRequest: async (Keyword) => {
        set({ProductList:null})
        let res = await axios.get(`/api/ProductListByKeyword/${Keyword}`);
        if(res.data['status'] === 'success'){
            set({ProductList: res.data['data']});
        }
    },

    ProductListByFilterRequest: async (PostBody) => {
        set({ProductList:null})
        let res = await axios.post(`/api/ProductListByFilter`, PostBody);
        if(res.data['status'] === 'success'){
            set({ProductList: res.data['data']});
        }
    },

    SearchKeyWord: "",
    SetSearchKeyWord: async (keyword) => {
        set({SearchKeyWord: keyword});
    },

    ProductDetails: null,
    ProductDetailsRequest: async (id) => {
        set({ProductDetails:null})
        let res = await axios.get(`/api/ProductDetailsByID/${id}`);
        if(res.data['status'] === 'success'){
            set({ProductDetails: res.data['data']});
        }
    },

    ProductReview: null,
    ProductReviewRequest: async (id) => {
        set({ProductReview:null})
        let res = await axios.get(`/api/ProductReviewListByID/${id}`);
        if(res.data['status'] === 'success'){
            set({ProductReview: res.data['data']});
        }
    },


}));

export default ProductStore;