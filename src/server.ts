import express, { Request, Response } from "express";
import { config } from "./config";
const app = express()
const port = config.PORT

app.get('/', (req: Request, res: Response) => {
  res.send(`Hello World, JS! ${config.PORT}` )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
