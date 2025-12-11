import { Result } from "pg";
import { pool } from "../../config/db";
import { vehicleController } from "../vehicle/vehicle.controller";

type ServiceGiveBookingPayload = {
    customer_id: number, 
    vehicle_id: number, 
    rent_start_date: string, 
    rent_end_date: string
}
const serviceGiveBooking = async(payload: ServiceGiveBookingPayload) => {
    const availbilityQuery = "SELECT availability_status FROM vehicle WHERE id = $1";
    const availbilityResult = await pool.query(availbilityQuery, [payload.vehicle_id]);
    const availability_status = availbilityResult.rows[0].availability_status;
    
    if(availability_status !== "available") {
        throw new Error("The current vehicle is not avaiable");
    }

    const startDate = new Date(payload.rent_start_date).getTime();
    const endDate = new Date(payload.rent_end_date).getTime();
    let time = (endDate - startDate) / (1000 * 60 * 60 * 24);

    const getQUery = "SELECT vehicle_name, daily_rent_price FROM vehicle WHERE id = $1";
    const getResult = await pool.query(getQUery, [payload.vehicle_id]);
    const vehicleDetails = getResult.rows[0];

    const data = {
        ...payload, 
        total_price: time * vehicleDetails.daily_rent_price, 
        status: "active", 
        vehicle: {
            vehicle_name: vehicleDetails.vehicle_name, 
            daily_rent_price: vehicleDetails.daily_rent_price
        }
    }

    const postQuery = `
        INSERT INTO bookings 
        (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
    `

    const postResult = await pool.query(postQuery, [
        data.customer_id, 
        data.vehicle_id, 
        data.rent_start_date, 
        data.rent_end_date, 
        data.total_price, 
        data.status
    ])

    const updateAvailabilit = pool.query(`UPDATE vehicle SET availability_status = 'booked' WHERE id = $1`, [
        payload.vehicle_id
    ])
    return {
        id: postResult.rows[0].id, 
        ...data
    };

}

const serviceShowServices = async(userInfo: any) => {
    if(userInfo.role === "admin") {
        const query = `SELECT * FROM bookings`;
        const result = await pool.query(query);
        return result.rows;
    } else {
        const query = "SELECT * FROM bookings WHERE customer_id = $1";
        const result = await pool.query(query, [userInfo.id]);
        return result.rows;
    }
}

export const bookingService = {
    serviceGiveBooking, serviceShowServices
}