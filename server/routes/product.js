


import express from "express";
import { createProduct, deleteById, getAllProducts, getProductById, searchProduct, updateById } from "../controllers/product.js";
import { isAdmin } from "../middlewares/auth.js";
import { productImageMiddleware } from "../middlewares/multer.js";


const app = express.Router()

app.get("/search",searchProduct)
app.get("/allproducts", getAllProducts)
app.get("/getbyid/:id",getProductById) 

app.use(isAdmin)
app.get("/getbyid/:id",getProductById) 
app.get("/allproducts", getAllProducts)
app.post("/addnew",productImageMiddleware,createProduct)
app.put("/update/:id",updateById)
app.post("/delete/:id",deleteById)

export default app;