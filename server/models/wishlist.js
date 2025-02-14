import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const WishlistSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } 
);

export const Wishlist = models.Wishlist || model("Wishlist", WishlistSchema);
