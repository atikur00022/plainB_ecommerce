import {
    CreateUserProfileService,
    LoginService, ReadUserProfileService,
    UpdateUserProfileService,
    VerifyLoginService
} from "../service/UserServices.js";
import {ProductReviewCreateService, ProductReviewUpdateService} from "../service/ProductReviewServices.js";

export const Login = async (req, res) => {
    const result = await LoginService(req);
    res.json(result);
}

export const VerifyLogin = async (req, res) => {
    const result = await VerifyLoginService(req);
    res.json(result);
}

export const CreateUserProfile = async (req, res) => {
    const result = await CreateUserProfileService(req);
    res.json(result);
}

export const ReadUserProfile = async (req, res) => {
    const result = await ReadUserProfileService(req);
    res.json(result);
}

export const UpdateUserProfile = async (req, res) => {
    const result = await UpdateUserProfileService(req);
    res.json(result);
}

export const ProductReviewCreate = async (req, res) => {
    const result = await ProductReviewCreateService(req);
    res.json(result);
}

export const ProductReviewUpdate = async (req, res) => {
    const result = await ProductReviewUpdateService(req);
    res.json(result);
}