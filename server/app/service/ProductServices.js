import mongoose from "mongoose";
import BrandsModel from "../models/brandsModel.js";
import CategoriesModel from "../models/categoriesModel.js";
import SliderModel from "../models/slidersModel.js";
import ProductsModel from "../models/productsModel.js";
import ReviewsModel from "../models/reviewsModel.js";

const ObjectId = mongoose.Types.ObjectId;

export const BrandsListService = async () => {
    try {
        const ProjectStage = {$project:{
                'createdAt': 0,
                'updatedAt': 0
            }};
        const data = await BrandsModel.aggregate([
            ProjectStage
        ]);
        return {status: 'success', data: data}
    } catch (e) {
        return {status: 'fail', data: e.toString()}
    }
}

export const CategoriesListsService = async () => {
    try {
        const data = await CategoriesModel.find();
        return {status: 'success', data: data}
    } catch (e) {
        return {status: 'fail', data: e.toString()}
    }
}

export const SliderListsService = async () => {
    try {
        const data = await SliderModel.find();
        return {status: 'success', data: data}
    } catch (e) {
        return {status: 'fail', data: e.toString()}
    }
}

export const ListByBrandService = async (req) => {
    try {
        const BrandId = new ObjectId(req.params.BrandId);
        const MatchingStage = {$match: {brandID: BrandId}};

        const JoinWithBrandStage = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        const JoinWithCategoryStage = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};

        const UnwindBrandStage = {$unwind: "$brand"};
        const UnwindCategoryStage = {$unwind: "$category"};
        
        const ProjectStage = {$project: {
                "createdAt": 0,
                "updatedAt": 0,
                "brand._id": 0,
                "brand.createdAt": 0,
                "brand.updatedAt": 0,
                "category._id": 0,
                "category.createdAt": 0,
                "category.updatedAt": 0,
                "brandID": 0,
                "categoryID": 0
        }};
        
        const data = await ProductsModel.aggregate([
            MatchingStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectStage
        ]);

        return{status: 'success', data: data};
    } catch (e) {
        return {status: 'fail', data: e.toString()}
    }
}

export const ListByCategoryService = async (req) => {
    try{
        const CategoryID = new ObjectId(req.params.CategoryID);
        const MatchingStage = {$match: {categoryID: CategoryID}};

        const JoinWithBrandStage = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        const JoinWithCategoryStage = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};

        const UnwindBrandStage = {$unwind: "$brand"};
        const UnwindCategoryStage = {$unwind: "$category"};

        const ProjectStage = {$project: {"brand._id": 0, "category._id": 0, "brandID": 0, "categoryID": 0}};

        const data = await ProductsModel.aggregate([
            MatchingStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectStage
        ]);

        return {status: 'success', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()}
    }
}

export const ListByRemarkService = async (req) => {
    try{
        const Remark = req.params.Remark;
        const MatchingStage = {$match: {remark: Remark}};

        const JoinWithBrandStage = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        const JoinWithCategoryStage = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};

        const UnwindBrandStage = {$unwind: "$brand"};
        const UnwindCategoryStage = {$unwind: "$category"};

        const ProjectStage = {$project: {"brand._id": 0, "category._id": 0, "brandID": 0, "categoryID": 0}};

        const data = await ProductsModel.aggregate([
            MatchingStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectStage
        ]);

        return {status: 'success', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()}
    }
}

export const ListByKeywordService = async (req) => {
    try {
        const Keyword = req.params.Keyword;
        const regex = {$regex: Keyword, $options: "i"};
        const SearchParams = [{title: regex}, {shortDes: regex}];
        const SearchQuery = {$or: SearchParams};
        const MatchingStage = {$match: SearchQuery};

        const  JoinWithBrandStage = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        const  JoinWithCategoryStage = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};

        const UnwindBrandStage = {$unwind: "$brand"};
        const UnwindCategoryStage = {$unwind: "$category"};

        const ProjectStage = {$project: {"brand._id": 0, "category._id": 0, "brandID": 0, "categoryID": 0}};

        const data = await ProductsModel.aggregate([
            MatchingStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectStage
        ]);

        return {status: 'success', data: data}
    }catch (e) {
        return {status: 'fail', data: e.toString()}
    }
}

export const DetailByIdService = async (req) => {
    try {
        const DetailsID = new ObjectId(req.params.DetailsID);
        const MatchingStage = {$match: {_id: DetailsID}};

        const JoinWithBrandStage = {$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
        const JoinWithCategoryStage = {$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
        const JoinWithProductDetailsStage = {$lookup: {from: "details", localField: "_id", foreignField: "productID", as: "details"}}

        const UnwindBrand = {$unwind: "$brand"};
        const UnwindCategory = {$unwind: "$category"};
        const UnwindProductDetails = {$unwind: "$details"};

        const ProjectStage = {$project: {"brand._id": 0, "category._id": 0, "details._id": 0, "details.productID": 0, "brandID": 0, "categoryID": 0}};

        const data = await ProductsModel.aggregate([
            MatchingStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithProductDetailsStage,
            UnwindBrand,
            UnwindCategory,
            UnwindProductDetails,
            ProjectStage
        ]);

        return {status: 'success', data: data}
    }catch (e) {
        return {status: 'fail', data: e.toString()}
    }
}

export const ReviewListService = async (req) => {
    try {
        const ReviewID = new ObjectId(req.params.ReviewID);
        const MatchingStage = {$match: {productID: ReviewID}};

        const JoinWithProfileStage = {$lookup: {from: "profiles", localField: "userID", foreignField: "userID", as: "profile"}};

        const UnwindProfileStage = {$unwind: "$profile"};

        const ProjectStage = {$project: {"des": 1, "rating": 1, "profile.cus_name": 1}};

        const data = await ReviewsModel.aggregate([
            MatchingStage,
            JoinWithProfileStage,
            UnwindProfileStage,
            ProjectStage
        ]);

        return {status: 'success', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}

export const ProductListByFilterService = async (req) => {
    try {

        let matchConditions = {};
        if (req.body['categoryID']) {
            matchConditions.categoryID = new ObjectId(req.body['categoryID']);
        }
        if (req.body['brandID']) {
            matchConditions.brandID = new ObjectId(req.body['brandID']);
        }
        let MatchStage = { $match: matchConditions };






        let AddFieldsStage = {
            $addFields: { numericPrice: { $toInt: "$price" }}
        };
        let priceMin = parseInt(req.body['priceMin']);
        let priceMax = parseInt(req.body['priceMax']);
        let PriceMatchConditions = {};
        if (!isNaN(priceMin)) {
            PriceMatchConditions['numericPrice'] = { $gte: priceMin };
        }
        if (!isNaN(priceMax)) {
            PriceMatchConditions['numericPrice'] = { ...(PriceMatchConditions['numericPrice'] || {}), $lte: priceMax };
        }
        let PriceMatchStage = { $match: PriceMatchConditions };






        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  ProductsModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}

























