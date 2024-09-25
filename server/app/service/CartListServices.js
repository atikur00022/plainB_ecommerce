import CartsModel from "../models/cartsModel.js";
import {ObjectId} from "mongodb";

export const CreateCartService = async (req) => {
    try {
        const user_id = req.headers['user_id'];
        const { productID, color, qty, size } = req.body;
        const PostJson = {
            productID,
            color,
            qty,
            size,
            userID: user_id
        }
        const  data = await CartsModel.create(PostJson);
        return {status: 'success', message: 'Cart list created successfully!', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}

export const ReadCartService = async (req) => {
    try {
        const user_id = new ObjectId(req.headers['user_id']);
        const MatchingStage = {$match: {userID: user_id}};

        const JoinWithProductStage = {$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}};

        const data = await CartsModel.aggregate([
            MatchingStage,
            JoinWithProductStage
        ]);
        return {status: 'success', message: 'Cart read successfully!', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}

export const UpdateCartService = async (req) => {
    try {
        const user_id = new ObjectId(req.headers['user_id']);
        const { cartID, color, qty, size } = req.body;
        const PostJson = {
            color,
            qty,
            size
        }
        const data = await CartsModel.updateOne({userID: user_id, _id: cartID},{$set: PostJson});
        return {status: 'success', message: 'Cart updated successfully!', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}

export const RemoveCartService = async (req) => {
    try {
        const user_id = new ObjectId(req.headers['user_id']);
        const {cartId} = req.body;
        const PostJson = {
            _id: cartId,
            userID: user_id
        }
        const data = await CartsModel.deleteOne(PostJson);
        return {status: 'success', message: 'Cart remove successfully!', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}