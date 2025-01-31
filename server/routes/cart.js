


import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { addToCart, decrementQuantity, getCartDetails, removeCartItem, updateCartQuantity } from "../controllers/cart.js";

const app = express.Router()

// app.use(isAuthenticated)

app.post("/my/addtocart",addToCart)
app.get("/mycart/:id",getCartDetails)
app.post("/my/update/:id",updateCartQuantity)
app.post("/my/removeItem/:id",removeCartItem)
app.post("my/decrement/:id",decrementQuantity)

 

export default app;