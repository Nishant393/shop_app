import { Cart } from "../models/cart.js";

const addToCart = async (req, res,next) => {
    try {
        const { userId, productId, quantity = 1 } = req.body;

        const cartItem = await Cart.findOneAndUpdate(
            { user: userId, product: productId }, 
            { $inc: { quantity } }, 
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, message: "Product added to cart", cartItem });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const getCartDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Cart.find({ user: id })
            .populate({ path: "product", populate: { path: "brand" } });

        res.status(200).json({ success: true, result });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export { addToCart, getCartDetails };
