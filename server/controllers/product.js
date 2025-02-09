import { Products } from "../models/product.js";
import { User } from "../models/user.js";
import { uploadFilesToCloudinary } from "../utils/features.js";
import mongoose from "mongoose";

// Create a new product
const createProduct = async (req, res, next) => {
    try {
        const { productName, quantity, stock, price, description, category, brand } = req.body;
        const files = req.files;
        let productUrl;

        // Ensure files are provided
        if (!files || files.length === 0) {
            return next(new Error("No files provided for upload"));
        }

        try {
            console.log("Trying to upload image");
            const result = await uploadFilesToCloudinary(files);  // Upload the image(s)
            console.log("Result of Cloudinary upload:", result);

            // If there are multiple files, we can map them, else we use the first one.
            productUrl = result[0];

            console.log("productUrl object:", productUrl);
        } catch (error) {
            return next(new Error("Image upload failed: " + error.message));
        }

        // Create the product
        const createdProduct = await Products.create({
            productName,
            stock,
            quantity,
            price,
            description,
            category,
            brand,
            productUrl,  // Save the image URL(s) in the DB
        });
        

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: createdProduct
        });

    } catch (error) {
        next(error);
    }
};

// Search for products
const searchProduct = async (req, res, next) => {
    try {
        const { productName = "", limit = 20, page = 1 } = req.query;
        const parsedLimit = parseInt(limit, 10) || 20;
        const parsedPage = parseInt(page, 10) || 1;

        const searchedProducts = await Products.find({
            productName: { $regex: productName, $options: "i" }
        })
        .skip((parsedPage - 1) * parsedLimit)
        .limit(parsedLimit);

        res.status(200).json({ success: true, products: searchedProducts });
    } catch (error) {
        next(error);
    }
};

// Get product by ID
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};

// Get all products with pagination
// const getAllProducts = async (req, res, next) => {
//     try {
//         let { page = 1, limit = 50 } = req.query;
//         page = parseInt(page, 10) || 1;
//         limit = parseInt(limit, 10) || 50;

//         const totalDocs = await Products.countDocuments();
//         const products = await Products.find().skip((page - 1) * limit).limit(limit);

//         res.set("X-Total-Count", totalDocs);
//         res.status(200).json({ success: true, products });
//     } catch (error) {
//         next(error);
//     }
// };

 const getAllProducts = async (req, res, next) => {
    try {
        const {productName, category, brand, minPrice, maxPrice, sort, page = 1, limit = 50 } = req.query;

        let filter = {};
        if (productName) filter.productName = { $regex: productName, $options: "i" }; 
        if (category) filter.category = category;
        if (brand) filter.brand = brand;
        if (minPrice || maxPrice) filter.price = { 
            ...(minPrice && { $gte: minPrice }), 
            ...(maxPrice && { $lte: maxPrice }) 
        };

        let query = Products.find(filter);
        if (sort) query = query.sort(sort);
        query = query.skip((page - 1) * limit).limit(Number(limit));

        const products = await query;
        res.status(200).json({ success: true, products });
    } catch (error) {
        next(error);
    }
};


// Delete product by ID
const deleteById = async (req, res, next) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({
             success: false,
            message: "Product not found" 
        });

        res.status(200).json({ 
            success: true, 
            message: "Product deleted successfully" 
        });
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false,
                 message: "Invalid product ID" });
        }

        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            { $set: req.body }, 
            { new: true, runValidators: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product updated successfully", updatedProduct });
    } catch (error) {
        next(error);
    }
};

export default updateById;


const allQuantites = async(req,res)=>{
    try {
        const allProductCount = await Products.find().countDocuments()
        const alluserCount  = await User.find().select("email name").countDocuments()
        const allCategoryCount = {
            productCount:allProductCount,
            userCount:alluserCount
        } 
        res.status(200).json ({
            success:true, message:"all quantities ",
            allCategoryCount

        })
    } catch (error) {
        console.log(error)
        
    }

}


export { createProduct, getAllProducts, searchProduct, getProductById, deleteById, updateById, allQuantites };
