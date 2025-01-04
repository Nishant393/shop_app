

import express from "express";
import { getMyProfile, login, logout, newUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { get } from "mongoose";

const app = express.Router()

app.post("/newuser",newUser);
app.post("/login",login);
app.post("/logout",logout);

app.use(isAuthenticated)
app.get("/me", getMyProfile)
app.get("/cartDetails", )

export default app;