


import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { addToCart, getMyCart, removeCartItem, updateCartQuantity } from "../controllers/cart.js";

const app = express.Router()

app.use(isAuthenticated)

app.post("/addtocart",addToCart)
app.get("/mycart",getMyCart)
app.patch("/my/update/:id",updateCartQuantity)
app.patch("/my/removeItem/:id",removeCartItem)


export default app;