


import express from "express";
import { isAdmin } from "../middlewares/admin.js";

const app = express.Router()
// app.get("/getallproducts", )
app.use(isAdmin)
app.post("/addnewProduct");

// app.get("/me", getMyProfile)
// app.get("/cartDetails", )

export default app;