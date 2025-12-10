import { Request, Response } from "express";
import { userServices } from "./users.services";

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.serviceGetAllUser();
        res.status(200).send({
            success: true, 
            message: "Users retrieved successfully", 
            data: result
        })
    } catch(error: any) {
        res.status(500).send({
            success: false, 
            message: error.message
        })
    }
}

const deleteUser = async(req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const result = await userServices.serviceDeleteUser(Number(userId));
        res.status(200).send({
            success: true,
            message: "User deleted successfully"
        });
    } catch(error: any) {
        res.status(500).send({
            success: false, 
            message: error.message
        })
    }
}

export const userController = {
    getAllUser, 
    deleteUser
}