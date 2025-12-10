import { Request, Response } from "express";
import { authServices } from "./auth.service";

const createNewUser = async(req: Request, res: Response) => {
    const {name, email, password, phone, role} = req.body;
    const result = await authServices.serviceCreateUser(name, email, password, phone, role)
    res.send(result);
}

export const authController = {
    createNewUser
}