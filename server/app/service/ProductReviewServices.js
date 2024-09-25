import {ObjectId} from "mongodb";
import ReviewsModel from "../models/reviewsModel.js";

export const ProductReviewCreateService = async (req) => {
    try {
        const user_id = new ObjectId(req.headers['user_id']);
        const {productID, des, rating} = req.body;
        const PostJson = {
            productID: productID,
            des: des,
            rating: rating,
            userID: user_id
        }
        await ReviewsModel.updateOne({userID: user_id, productID: productID}, {$set: PostJson}, {upsert: true});
        return {status: 'success', message: 'Product review created successfully!'};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}

export const ProductReviewUpdateService = async (req) => {
    try {
        const user_id = new ObjectId(req.headers['user_id']);
        const {productID, des, rating} = req.body;
        const PostJson = {
            productID: productID,
            des: des,
            rating: rating,
            userID: user_id
        }
        await ReviewsModel.updateOne({userID: user_id, productID: productID}, {$set: PostJson}, {upsert: true});
        return {status: 'success', message: 'Product review updated successfully!'};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}