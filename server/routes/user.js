

import express from "express";
import {  login, logout, newUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router()

app.post("/newuser",newUser);
app.post("/login",login);
app.post("/logout",logout);

app.use(isAuthenticated)
// app.get("/me", getMyProfile)
// app.get("/cartDetails", )

export default app;