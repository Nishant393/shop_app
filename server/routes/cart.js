import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addToCart,  getCart, getcartById, removeFromCart, updateCartQuantity } from "../controllers/cart.js";



const app = express.Router();

app.use(isAuthenticated);

app.post("/addtocart", addToCart);

app.get("/mycart",getCart);


// app.patch("/update/",updateCartQuantity);

app.get("/get/:id", getcartById)
app.patch('/update-quantity/:cartId', updateCartQuantity);

app.delete("/cart/item/delete/:productId",removeFromCart);



export default app;
