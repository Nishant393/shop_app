import { Products } from "../models/product.js";

// Create a new product
const createProduct = async (req, res) => {
    try {
        const createdProduct = new Products(req.body);
        await createdProduct.save();
        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            createdProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding product" });
    }
};

// Search for products
const searchProduct = async (req, res) => {
    try {
        const { productName = "", limit = 20, page = 1 } = req.query;

        const searchedProducts = await Products.find({
            productName: { $regex: productName, $options: "i" }
        })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            products: searchedProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error searching for products" });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching product details" });
    }
};

// Get all products with pagination
const getAllProducts = async (req, res) => {
    try {
        let { page = 1, limit = 50 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const totalDocs = await Products.countDocuments();
        const products = await Products.find().skip((page - 1) * limit).limit(limit);

        res.set("X-Total-Count", totalDocs);
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching products" });
    }
};

// Delete product by ID
const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Products.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
};

// Update product by ID
const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Products.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating product" });
    }
};

export { createProduct, getAllProducts, searchProduct, getProductById, deleteById, updateById };
