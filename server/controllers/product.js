import { Product } from "../models/product.js";

// Validation schema for products


const createProduct = async (req, res, next) => {
    try {
        const createdProduct = new Product(req.body);
        console.log(req.body)
        await createdProduct.save()
        return res.status(200).json({
            message: "product added successfully ",
            createdProduct
        })

    } catch (error) {
        console.log(error);
    }
}





const getAllProducts = async (req, res, next) => {
    try {
        const filter = {}
        const sort={}
        const skip = 0
        const limit = 0


    } catch (error) {
        console.log(error);
    }

}

export { createProduct, getAllProducts };

