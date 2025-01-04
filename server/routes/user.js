

import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { login, newUser } from "../controllers/user.js";

const app = express.Router()

app.post("/newuser",newUser);
app.post("/login",login);

app.use(isAuthenticated)



export default app;