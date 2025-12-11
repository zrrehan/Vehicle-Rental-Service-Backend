import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

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

const updateStatus = async() => {
    try {
        await bookingService.serviceBookingStatus();
    } catch(error: any) {
        throw new Error(error.message);
    }
}

const showBookings = async(req: Request, res: Response) => {
    try {
        await updateStatus();
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

const updateStatusByUsers = async(req: Request, res: Response) => {
    try {
        const {bookingId} = req.params;
        const result = await bookingService.serviceEditStatusByUser(Number(bookingId), req.userInfo as JwtPayload);
        res.status(200).send(result);
    } catch(error: any) {
        res.status(500).send({
            success: false, 
            message: error.message
        })
    }
}

export const bookingController = {
    giveBooking, showBookings, updateStatusByUsers
}