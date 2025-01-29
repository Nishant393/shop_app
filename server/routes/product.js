


import express from "express";
import { createProduct, deleteById, getAllProducts, getProductById, searchProduct } from "../controllers/product.js";


const app = express.Router()

app.get("/search",searchProduct)
app.post("/addnew",createProduct)
app.get("/allproducts", getAllProducts)
app.get("/getbyid/:id",getProductById) 
app.get("/search",searchProduct)
app.post("/deletebyid/:id",deleteById)



export default app;