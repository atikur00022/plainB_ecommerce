import {FeaturesListService, legalDetailsService} from "../service/FeatureService.js";

export const FeaturesList = async (req, res) => {
    const result = await FeaturesListService(req);
    res.json(result);
}

export const legalDetails = async (req, res) => {
    const result = await legalDetailsService(req);
    res.json(result);
}