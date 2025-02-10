
import { Cart } from "../models/Cart.js";

// Create new cart item
export const createCart = async (req, res) => {
    try {
        const {  product, quantity = 1 } = req.body;
        const user = req.user
        // Check if cart already exists for this user and product
        const existingCart = await Cart.findOne({ user, product })
            .populate({
                path: 'product',
                select: 'name price description brand productUrl' // Add fields you want from product
            });
        
        if (existingCart) {
            // If product exists, increase the quantity
            const updatedCart = await Cart.findByIdAndUpdate(
                existingCart._id,
                { quantity: existingCart.quantity + Number(quantity) },
                { new: true }
            ).populate({
                path: 'product',
                select: 'name price description image'
            });

            return res.status(200).json({
                success: true,
                message: "Cart quantity updated successfully",
                cart: updatedCart
            });
        }

        // If product doesn't exist, create new cart item
        const newCart = await Cart.create({
            user,
            product,
            quantity
        });

        // Populate the product details before sending response
        const populatedCart = await Cart.findById(newCart._id).populate({
            path: 'product',
            select: 'name price description image'
        });

        res.status(201).json({
            success: true,
            message: "Product added to cart successfully",
            cart: populatedCart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding product to cart",
            error: error.message
        });
    }
};

// Get cart items for a user
export const getCart = async (req, res) => {
    try {
        // const { userId } = req.params;
        

        const cartItems = await Cart.find({ user: req.user })
            .populate({
                path: 'product',
                select: 'name price description productUrl isAvailable category '
            })
            .lean();

        if (!cartItems.length) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cartItems: []
            });
        }

        res.status(200).json({
            success: true,
            cartItems
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching cart items",
            error: error.message
        });
    }
};


// Delete cart item
export const deleteCart = async (req, res) => {
    try {
        const { cartId } = req.params;

        const deletedCart = await Cart.findByIdAndDelete(cartId).populate({
            path: 'product',
            select: 'name price description image'
        });

        if (!deletedCart) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            deletedCart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error removing product from cart",
            error: error.message
        });
    }
};