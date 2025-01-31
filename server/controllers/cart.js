import { Cart } from "../models/cart.js";
import { Products } from "../models/product.js";
import mongoose from "mongoose";

// Add to Cart (or Increment Quantity)
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

        // Update cart item or insert a new one
        const cartItem = await Cart.findOneAndUpdate(
            { user, product },
            { $inc: { quantity: Number(quantity) } },
            { new: true, upsert: true }
        ).populate("product");

        res.status(200).json({ success: true, message: "Product added to cart", cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Get Cart Details for a User
const getCartDetails = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID" });
        }

        const cartItems = await Cart.find({ user: id }).populate({
            path: "product",
            populate: { path: "brand" }, // Ensure brand details are populated
        });

        res.status(200).json({ success: true, result: cartItems.length ? cartItems : [], message: cartItems.length ? "Cart fetched successfully" : "Cart is empty" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Update Cart Item Quantity
const updateCartQuantity = async (req, res) => {
    try {
        const { user, product, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(product) || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Invalid user, product ID, or quantity" });
        }

        const updatedCartItem = await Cart.findOneAndUpdate(
            { user, product },
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

// Remove an Item from Cart
const removeCartItem = async (req, res) => {
    try {
        const { user, product } = req.params;

        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(product)) {
            return res.status(400).json({ success: false, message: "Invalid user or product ID" });
        }

        const deletedCartItem = await Cart.findOneAndDelete({ user, product });

        if (!deletedCartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        res.status(200).json({ success: true, message: "Product removed from cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Decrement Quantity or Remove from Cart
const decrementQuantity = async (req, res) => {
    try {
        const { user, product } = req.body;

        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(product)) {
            return res.status(400).json({ success: false, message: "Invalid user or product ID" });
        }

        const cartItem = await Cart.findOne({ user, product });

        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        if (cartItem.quantity > 1) {
            // Reduce quantity by 1
            cartItem.quantity -= 1;
            await cartItem.save();
            res.status(200).json({ success: true, message: "Quantity decremented", cartItem });
        } else {
            // Remove item from cart if quantity reaches 0
            await Cart.deleteOne({ user, product });
            res.status(200).json({ success: true, message: "Product removed from cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export { addToCart, getCartDetails, updateCartQuantity, removeCartItem, decrementQuantity };
