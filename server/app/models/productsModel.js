import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        short_des: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        discount: {
            type: Boolean,
            required: true,
        },
        discount_price: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        star: {
            type: String,
            required: true,
        },
        stock: {
            type: Boolean,
            required: true,
        },
        remark: {
            type: String,
            required: true,
        },
        categoryID: {
            type: mongoose.Schema.Types.ObjectId,
        },
        brandID: {
            type: mongoose.Schema.Types.ObjectId,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ProductsModel = mongoose.model("products", ProductSchema);

export default ProductsModel;