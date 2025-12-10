import { pool } from "../../config/db";

type VehicleData = {
  vehicle_name: string;
  type: string;
  registration_number: string;
  daily_rent_price: number;
  availability_status: string;
}

const service_addVehicle = async(payload: VehicleData) => {
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status} = payload;
    if(!["available", "booked"].includes(availability_status)) {
        throw new Error("availability_status will be 'available' or 'booked'");
    }
    const query = `
        INSERT INTO 
        vehicle (vehicle_name, type, registration_number, daily_rent_price, availability_status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `

    const result = await pool.query(query, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return {
        sucess: true, 
        message: "Vehicle created successfully", 
        data: result.rows[0]
    };
}

const getAllVehicle = async() => {
    const result = await pool.query("SELECT * FROM vehicle");
    return result.rows;
}


const service_getSingleVehicle = async(vehicleId: number) => {
    const result = await pool.query("SELECT * FROM vehicle WHERE id = $1", [vehicleId]);
    return result.rows;
}

export const vehicleServices = {
    service_addVehicle, 
    getAllVehicle, 
    service_getSingleVehicle
}