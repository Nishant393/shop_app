import mongoose from "mongoose";
import { Cart } from "../models/cart.js";
import { Products } from "../models/product.js";

// Add to Cart (or Increment Quantity)
const addToCart = async (req, res) => {
    try {
        const { products = [] } = req.body;
        const userId = req.user;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Products array is required"
            });
        }
        const productMap = new Map();
        for (const { product, quantity } of products) {
            if (!mongoose.Types.ObjectId.isValid(product) || quantity < 1) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product ID or quantity"
                });
            }
            productMap.set(product, (productMap.get(product) || 0) + Number(quantity));
        }
        const productIds = [...productMap.keys()];
        const existingProducts = await Products.find({ _id: { $in: productIds } });
        const validProductIds = new Set(existingProducts.map(p => p._id.toString()));

        const bulkOperations = [];
        for (const [product, quantity] of productMap.entries()) {
            if (!validProductIds.has(product)) {
                return res.status(404).json({ success: false, message: `Product not found: ${product}` });
            }
            bulkOperations.push({
                updateOne: {
                    filter: { user: userId, product },
                    update: { $inc: { quantity } },
                    upsert: true
                }
            });
        }

        if (bulkOperations.length > 0) {
            await Cart.bulkWrite(bulkOperations);
        }

        res.status(200).json({ success: true, message: "Products added to cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const getMyCart = async (req, res) => {
    try {
        const userId = req.user;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const cartItems = await Cart.find({ user: userId }).populate("product");
        res.status(200).json({ success: true, cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user;
        const { product, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(product) || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Invalid product ID or quantity" });
        }

        const updatedCartItem = await Cart.findOneAndUpdate(
            { user: userId, product },
            { $set: { quantity: Number(quantity) } },
            { new: true }
        ).populate("product");

        if (!updatedCartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        res.status(200).json({ success: true, message: "Cart item updated", updatedCartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
const removeCartItem = async (req, res) => {
    try {
        const userId = req.user;
        const { product } = req.params;

        if (!mongoose.Types.ObjectId.isValid(product)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const deletedCartItem = await Cart.findOneAndDelete({ user: userId, product });

        if (!deletedCartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        res.status(200).json({ success: true, message: "Product removed from cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export { addToCart, getMyCart, removeCartItem, updateCartQuantity };
