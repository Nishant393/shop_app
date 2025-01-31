import { Cart } from "../models/cart.js";
import { Products } from "../models/product.js";
import mongoose from "mongoose";

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const { user, product, quantity = 1 } = req.body;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(product)) {
            return res.status(400).json({ success: false, message: "Invalid user or product ID" });
        }

        // Check if product exists
        const existingProduct = await Products.findById(product);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Update cart
        const cartItem = await Cart.findOneAndUpdate(
            { user, product }, // Find by user and product
            { $inc: { quantity: Number(quantity) } }, // Increment quantity
            { new: true, upsert: true }
        ).populate("product"); // Populate product details

        res.status(200).json({ success: true, message: "Product added to cart", cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Get Cart Details
const getCartDetails = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate user ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        // Fetch cart items
        const result = await Cart.find({ user: id }).populate({
            path: "product",
            populate: { path: "brand" }, // Ensure brand details are populated
        });

        if (result.length === 0) {
            return res.status(200).json({ success: true, message: "Cart is empty", result: [] });
        }

        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export { addToCart, getCartDetails };
