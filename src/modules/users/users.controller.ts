import { Request, Response } from "express";

const getAllUser = async (req: Request, res: Response) => {
    console.log("Hello world");
    res.send({message: "Hello world"});
}

export const userController = {
    getAllUser
}