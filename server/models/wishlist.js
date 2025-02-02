import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Corrected 'require' to 'required'
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true, // Corrected 'require' to 'required'
    },
    note: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Wishlist", wishlistSchema);
