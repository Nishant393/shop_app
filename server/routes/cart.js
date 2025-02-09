import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createCart, deleteCart, getCart, updateCart } from "../controllers/cart.js";


const app = express.Router();

app.use(isAuthenticated);

app.post("/addtocart", createCart);

app.get("/mycart",getCart);

app.patch("/update/:cartId", updateCart);

app.delete("/remove/:cartId", deleteCart);

export default app;
