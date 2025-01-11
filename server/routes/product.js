


import express from "express";
import { isAdmin } from "../middlewares/admin.js";
import { getAllProducts } from "../controllers/products.js";

const app = express.Router()
app.get("/allproducts", getAllProducts)
app.use(isAdmin)
// app.post("/addnewProduct");



export default app;