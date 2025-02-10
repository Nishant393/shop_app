import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addToCart, clearCart, getCart, updateCartQuantity } from "../controllers/cart.js";



const app = express.Router();

app.use(isAuthenticated);

app.post("/addtocart", addToCart);

app.get("/mycart",getCart);

app.patch("/update/:cartId",updateCartQuantity);

app.patch("/clearcart/", clearCart);

export default app;
