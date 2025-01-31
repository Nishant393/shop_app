


import express from "express";
import { createProduct, deleteById, getAllProducts, getProductById, searchProduct, updateById } from "../controllers/product.js";
import { isAdmin } from "../middlewares/auth.js";


const app = express.Router()

app.get("/search",searchProduct)
app.get("/allproducts", getAllProducts)
app.get("/getbyid/:id",getProductById) 

app.use(isAdmin)
app.get("/getbyid/:id",getProductById) 
app.get("/allproducts", getAllProducts)
app.post("/addnew",createProduct)
app.get("/update/:id",updateById)
app.post("/delete/:id",deleteById)

export default app;