import mongoose from "mongoose";

const InvoicesProductSchema = new mongoose.Schema(
    {
        qty: { type: String, required: true },
        price: { type: String, required: true },
        color: { type: String, required: true },
        size: { type: String, required: true },
        invoiceID: { type: mongoose.Schema.Types.ObjectId, required: true},
        productID: { type: mongoose.Schema.Types.ObjectId, required: true },
        userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const InvoicesProductModel = mongoose.model("invoicesproducts", InvoicesProductSchema);

export default InvoicesProductModel;