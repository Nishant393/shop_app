


import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { addToCart, getCartDetails } from "../controllers/cart.js";

const app = express.Router()

app.use(isAuthenticated)
app.post("/my/addtocart/",addToCart)
app.get("/my/:id",getCartDetails)
 

export default app;