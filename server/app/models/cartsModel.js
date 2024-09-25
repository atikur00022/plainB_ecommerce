import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
    {
        color: { type: String, required: true },
        size: { type: String, required: true },
        qty: { type: String, required: true },
        productID: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
        userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true  },
    },
    {
        timestamps: true,
        versionKey: false,
    }
    );

const CartsModel = mongoose.model('carts', CartSchema);

export default CartsModel; 