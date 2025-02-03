

import express from "express";
import { changeUserToAdmin, getMyProfile, getUserById, login, logout, newUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";




const app = express.Router()

app.post("/newuser", newUser);
app.post("/login", login);

app.use(isAuthenticated)

app.post("/logout", logout);
app.get("/me",getMyProfile);
app.get("/byid",getUserById)
app.put("/toadmin",changeUserToAdmin);

export default app;