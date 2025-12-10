import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const addVehicle = async(req: Request, res: Response) => {
    const result = await vehicleServices.service_addVehicle(req.body);
    res.status(201).send(result);
}

export const vehicleController = {
    addVehicle
}