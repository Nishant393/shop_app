import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addToWishList, mywishlist, removefromWishlist } from "../controllers/wishlist.js";




const app = express.Router();

app.use(isAuthenticated);

app.post("/add",addToWishList);

app.get("/mylist",mywishlist);
app.delete("/my/delete", removefromWishlist)

// app.patch("/update/",updateCartQuantity);
// app.patch('/addtowishlist/:_id', updateCartQuantity);

// app.delete("/clearwishlist/:cartid", clearCart);

export default app;
