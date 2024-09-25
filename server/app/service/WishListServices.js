import WishesModel from "../models/wishesModel.js";
import {ObjectId} from "mongodb";

export const CreateWishService = async (req) => {
    try {
        const user_id = req.headers['user_id'];
        const reqBody = req.body;
        reqBody.userID = user_id;
        const data = await WishesModel.updateOne(reqBody, {$set: reqBody},{upsert: true});
        return {status: 'success', message: 'Product added into wishlist successfully!', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}

export const RemoveWishService = async (req) => {
    try {
        const user_id = req.headers['user_id'];
        const reqBody = req.body;
        reqBody.userID = user_id;
        const data = await WishesModel.deleteOne(reqBody);
        return {status: 'success', message: 'Product remove from wishlist successfully!', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}

export const ReadWishService = async (req) => {
    try {
        const user_id = new ObjectId(req.headers['user_id']);
        const MatchingStage = {$match: {userID: user_id}};

        const JoinWithProductStage = {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as: 'product'}};

        const data = await WishesModel.aggregate([
            MatchingStage,
            JoinWithProductStage
        ]);
        return {status: 'success', message: 'Wish list read successfully!', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}