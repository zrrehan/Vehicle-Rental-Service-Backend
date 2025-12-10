import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const addVehicle = async(req: Request, res: Response) => {
    try {
        const result = await vehicleServices.service_addVehicle(req.body);
        res.status(201).send(result);
    } catch(error: any) {
        res.status(500).send({
            success: false, 
            message: error.message
        })
    }
}

export const vehicleController = {
    addVehicle
}