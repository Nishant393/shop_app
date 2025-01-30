import { ErrorHandler } from "../constant/config.js";
import { Cart } from "../models/cart.js";
import { Products } from "../models/product.js";
import { User } from "../models/user.js";


const addToCart = async (req, res) => {
    try {
        const {userId, productId, quantity } = req.body;
        // const userId = req.user.id; // Assuming user ID is available from authentication middleware

        let cartItem = await Cart.findOne({ user: userId, product: productId });

        if (cartItem) {
            cartItem.quantity += quantity || 1;
            await cartItem.save();
        } else {
            cartItem = new Cart({
                user: userId,
                product: productId,
                quantity: quantity || 1,
            });
            await cartItem.save();
        }

        res.status(200).json({ success: true, message: "Product added to cart", cartItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};



const getCartDetails = async(req,res,next)=>{
    try {
        const {id} =req.params
        // const id = req.user
        const result = await Cart.find({user:id})
        
        res.status(200).json({
            result
        })
    } catch (error) {
        console.log(error)
    }
}


export{addToCart, getCartDetails }