import { ErrorHandler } from "../constant/config.js";
import { Products } from "../models/product.js";
import { User } from "../models/user.js";


const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            return next(new ErrorHandler("Invalid product or quantity", 400));
        }

        const product = await Products.findById(productId);
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


const getCartDetails = (req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}


export{addToCart, getCartDetails }