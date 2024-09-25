import {CreateWishService, ReadWishService, RemoveWishService} from "../service/WishListServices.js";

export const CreateWish = async (req, res) => {
    const result = await CreateWishService(req);
    res.json(result);
}

export const ReadWish = async (req, res) => {
    const result = await ReadWishService(req);
    res.json(result);
}

export const RemoveWish = async (req, res) => {
    const result = await RemoveWishService(req);
    res.json(result);
}