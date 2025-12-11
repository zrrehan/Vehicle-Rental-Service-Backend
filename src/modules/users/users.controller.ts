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

const updateUser = async(req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        if(req.userInfo?.role === "customer" && req.userInfo?.id !== Number(userId)) {
            console.log(req.userInfo?.id);
            console.log(userId);
            return res.status(403).send({
                success: false, 
                message: "You are not authorized"
            })
        }
    
        const result = await userServices.serviceUpdateUser(Number(userId), req.body);
        return res.status(200).send({
            success: true, 
            message: "User updated Successfully",
            data: result[0]
        })
    } catch(error: any) {
        return res.status(500).send({
            success: false, 
            message: error.message
        })
    }
}

export const userController = {
    getAllUser, 
    deleteUser, 
    updateUser
}