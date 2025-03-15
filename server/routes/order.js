import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addToCart,  getCart, getcartById, removeFromCart, updateCartQuantity } from "../controllers/cart.js";
import { createOrder, getOrderById, getUserOrders } from "../controllers/order.js";



const app = express.Router();

app.use(isAuthenticated);

app.post("/create-order", createOrder)
app.get("/user/:userId", getUserOrders)
app.get("/:orderId",getOrderById)



export default app;
