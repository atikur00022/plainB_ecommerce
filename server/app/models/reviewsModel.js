import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        des:{ type: String, required: true },
        rating: { type: String, required: true},
        userID: { type: mongoose.Schema.Types.ObjectId, required: true},
        productID: { type: mongoose.Schema.Types.ObjectId, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ReviewsModel = mongoose.model("reviews", ReviewSchema);
 
export default ReviewsModel;