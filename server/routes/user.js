

import express from "express";
import { getMyProfile, login, logout, newUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";




const app = express.Router()

app.post("/newuser", newUser);
app.post("/login", login);


app.use(isAuthenticated)

app.post("/logout", logout);
app.get("/me",getMyProfile);

export default app;