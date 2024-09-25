import mongoose from 'mongoose';

const WishesSchema = new mongoose.Schema(
    {
        productID: { type: mongoose.Schema.Types.ObjectId, required: true },
        userID: { type: mongoose.Schema.Types.ObjectId, required: true  },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const WishesModel = mongoose.model('wishes', WishesSchema);

export default WishesModel;