import express from "express";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../controllers/address.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router()

app.use(isAuthenticated)
app.post("/my/addnew",createAddress);
app.get("/my/address",getAddresses)
app.put("/my/update",updateAddress)
app.delete("/my/address/delete",deleteAddress)

  
export default app;