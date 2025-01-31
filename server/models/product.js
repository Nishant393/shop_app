import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
    {
        productName: { type: String, required: true },
        stock: { type: Number, default: 0 },
        quantity: { type: String },
        price: { type: Number, required: true, min: 0 },
        description: { type: String, required: true },
        category: { type: String, required: true },
        brand: { type: String },
        productUrl: {
            public_id: { type: String },
            url: { type: String },
        },
        tags: [{ type: String }],
        reviews: [
            {
                user: { type: Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, min: 1, max: 5 },
                comment: { type: String },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        discount: { type: Number, default: 0 },
        isAvailable: { type: Boolean, default: true },
    },
    { timestamps: true, versionKey: false }
);

export const Products = mongoose.models.Products || model("Products", schema);
