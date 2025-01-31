import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Products", 
            required: true
        },
        quantity: { type: Number, default: 1, min: 1 }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export const Cart = mongoose.models.Cart || model("Cart", cartSchema);
