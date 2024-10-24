import FeaturesModel from "../models/featuresModel.js";
import LegalModel from "../models/legalModel.js";

export const FeaturesListService = async (req) => {
    try{

        const data = await FeaturesModel.find();

        return { status: 'success', message: 'Feature list read successfully!', data: data };
    }catch (e) {
        return { status: 'fail', data: e.toString() };
    }
}

export const legalDetailsService = async (req) => {
    try{

        const type = req.params['type'];

        const data = await LegalModel.find({type: type});

        return { status: 'success', message: 'Legal details read successfully!', data: data };
    }catch (e) {
        return { status: 'fail', data: e.toString() };
    }
}