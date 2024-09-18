import {BrandsListService} from "../service/ProductServices.js";

export const BrandList = async (req, res) => {
    const result = await BrandsListService();
    res.json(result);
}