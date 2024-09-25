import {CreateCartService, ReadCartService, RemoveCartService, UpdateCartService} from "../service/CartListServices.js";

export const CreateCart = async (req, res) => {
    const result = await CreateCartService(req);
    res.json(result);
}

export const ReadCart = async (req, res) => {
    const result = await ReadCartService(req);
    res.json(result);
}

export const UpdateCart = async (req, res) => {
    const result = await UpdateCartService(req);
    res.json(result);
}

export const RemoveCart = async (req, res) => {
    const result = await RemoveCartService(req);
    res.json(result);
}