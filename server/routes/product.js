


import express from "express";
import { createProduct, deleteById, getAllProducts, getProductById, searchProduct, updateById } from "../controllers/product.js";

import { productImageMiddleware } from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/admin.js";


const app = express.Router()

app.get("/search",searchProduct)
app.get("/allproducts", getAllProducts)
app.get("/getbyid/:id",getProductById) 

app.use(isAdmin)
// app.get("/admingetbyid/:id",getProductById) 

app.post("/addnew",productImageMiddleware,createProduct)
app.get("/allproductsforadmin", getAllProducts)
app.put("/update/:id",updateById)
app.post("/delete/:id",deleteById)

export default app;