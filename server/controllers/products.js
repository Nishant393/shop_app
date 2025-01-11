import { Product, Products } from "../models/product.js";
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

const getAllProducts = async (req, res,next )=>{
    const {productName} = req.body;
    const product = await Products.find(productName);
    if(!product){
        return next(new ErrorHandler("no product found", 500))
    }
    res.status(200).json({
        product
    })  

}



const searchProduct=async(req, res,next)=>{
    

}

export { addProduct,getAllProducts };
