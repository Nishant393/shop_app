

import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newUser } from "../controllers/user.js";

const app = express.Router()

app.post("/newuser",newUser);
app.post("login");

app.use(isAuthenticated)



export default app;