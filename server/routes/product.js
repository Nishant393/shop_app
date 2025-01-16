


import express from "express";
import { createProduct, getAllProducts } from "../controllers/product.js";


const app = express.Router()
app.post("/addnew",createProduct)
app.get("/allproducts", getAllProducts)
app.get("/getbyid/:id")



export default app;