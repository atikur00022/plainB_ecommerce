import {CategoriesListsService} from "../service/ProductServices.js";

export const CategoriesLists = async (req, res) => {
    const result = await CategoriesListsService();
    res.json(result);
}