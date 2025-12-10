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

const viewAllVehicle = async(req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getAllVehicle();
        res.status(200).send({
            success: true, 
            message: result.length ? "Vehicles retrieved successfully": "No vehicles found", 
            data: result
        })
    } catch(error: any) {
        res.status(500).send({
            success: false, 
            message: error.message
        })
    }
}

const viewSingleVehicle = async(req: Request, res: Response) => {
    const {vehicleId} = req.params;
    try {
        const result = await vehicleServices.service_getSingleVehicle(Number(vehicleId));
        res.status(200).send({
            success: true, 
            message: result.length ? "Vehicle retrieved successfully": "No vehicle found", 
            data: result
        })
    } catch(error: any) {
        res.status(500).send({
            success: false, 
            message: error.message
        })
    }
}

const updateVehicle = async(req: Request, res: Response) => {
    try {
        const {vehicleId} = req.params;
        const result = await vehicleServices.service_updateVehcle(Number(vehicleId), req.body);
        res.status(200).send({
            success: true, 
            message: result.length ? "Vehicle updated successfully": "No vehicle found", 
            data: result.length ? result[0] : []
        })
    } catch(error: any) {
        res.status(500).send({
            success: false, 
            message: error.message
        })
    }
}

export const vehicleController = {
    addVehicle, 
    viewAllVehicle, 
    viewSingleVehicle, 
    updateVehicle
}