import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const giveBooking = async(req: Request, res: Response) => {
    try {
        const result = await bookingService.serviceGiveBooking(req.body);
        res.status(201).send({
            success: true, 
            message: "Booking created successfully", 
            data: result
        });
    } catch(error: any) {
        res.status(500).send({
            success: false, 
            message: error.message
        })
    }
}

const showBookings = async(req: Request, res: Response) => {
    try {
        const result = await bookingService.serviceShowServices(req.userInfo);
        res.status(200).send({
            success: true, 
            message: "Bookings retrieved successfully", 
            data: result
        })        
    } catch(error: any) {
        res.status(500).send({
            success: false, 
            message: error.message
        })
    }
}

export const bookingController = {
    giveBooking, showBookings
}