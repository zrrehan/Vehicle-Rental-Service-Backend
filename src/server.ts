import express, { Request, Response } from "express";
import { config } from "./config";
import { userRouter } from "./modules/users/users.routes";
import { initialDatabase } from "./config/db";
import { authRouter } from "./modules/auth/auth.routes";
import { auth } from "./middleware/auth";
const app = express()
const port = config.PORT

// parser 
app.use(express.json());

// db initialization 
initialDatabase();

app.use("/api/v1/auth", authRouter);
app.use("/users", userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
