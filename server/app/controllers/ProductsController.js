import {
    DetailByIdService,
    ListByBrandService,
    ListByCategoryService, ListByKeywordService,
    ListByRemarkService, ProductListByFilterService, ReviewListService,
    SliderListsService
} from "../service/ProductServices.js";

export const ProductListByCategory = async (req, res) => {
    const result = await ListByCategoryService(req);
    res.json(result);
}

export const ProductListByRemark = async (req, res) => {
    const result = await ListByRemarkService(req);
    res.json(result);
}

export const ProductListByBrand = async (req, res) => {
    const result = await ListByBrandService(req);
    res.json(result);
}

export const ProductListBySlider = async (req, res) => {
    const result = await SliderListsService();
    res.json(result);
}

export const ProductListByKeyword = async (req, res) => {
    const result = await ListByKeywordService(req);
    res.json(result);
}

export const ProductDetailsByID = async (req, res) => {
    const result = await DetailByIdService(req);
    res.json(result);
}

export const ProductReviewListByID = async (req, res) => {
    const result = await ReviewListService(req);
    res.json(result);
}

export const ProductListByFilter = async (req, res) => {
    const result = await ProductListByFilterService(req);
    res.json(result);
}

export const CreateProductReview = async (req, res) => {
    try {
        res.status(200).json({status: 'success', message: 'Create Product Review'});
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
}

export const UpdateProductReview = async (req, res) => {
    try {
        res.status(200).json({status: 'success', message: 'Update Product Review'});
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
}

















