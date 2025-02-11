import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addToCart, clearCart, getCart, updateCartQuantity } from "../controllers/cart.js";



const app = express.Router();

app.use(isAuthenticated);

app.post("/addtocart", addToCart);

app.get("/mycart",getCart);

// app.patch("/update/",updateCartQuantity);
app.patch('/update-quantity/:_id', updateCartQuantity);

app.delete("/clearcart/:cartid", clearCart);

export default app;
