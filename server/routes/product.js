


import express from "express";
import { createProduct, getAllProducts, getProductById, searchProduct } from "../controllers/product.js";


const app = express.Router()

app.get("/search",searchProduct)
app.post("/addnew",createProduct)
app.get("/allproducts", getAllProducts)
app.get("/getbyid/:id",getProductById) 
app.get("/search",searchProduct)



export default app;