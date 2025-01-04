import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../constant/config.js";
import joi from "joi";

// Validation schema for products
const productValidationSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    description: joi.string().min(10).max(500).required(),
    price: joi.number().positive().required(),
    stock: joi.number().integer().positive().required(),
    category: joi.string().min(3).max(50).required(),
});

// Admin: Add new product
const addProduct = async (req, res, next) => {
    try {
        const { error } = productValidationSchema.validate(req.body);
        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400));
        }

        const { name, description, price, stock, category } = req.body;

        const newProduct = await Product.create({ name, description, price, stock, category });
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct,
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler("Failed to add product", 500));
    }
};

// User: Add product to cart
const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            return next(new ErrorHandler("Invalid product or quantity", 400));
        }

        const product = await Product.findById(productId);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));
        }

        if (product.stock < quantity) {
            return next(new ErrorHandler("Not enough stock available", 400));
        }

        const user = await User.findById(req.user);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        // Check if product is already in cart
        const existingCartItem = user.cart.find(item => item.product.toString() === productId);

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart: user.cart,
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler("Failed to add product to cart", 500));
    }
};

export { addProduct, addToCart };
