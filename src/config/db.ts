import {Pool} from "pg";
import { config } from ".";
export const pool = new Pool({
    connectionString: config.CONNECTION_STRING
});

export async function initialDatabase() {
    const createUserTable = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY, 
            name VARCHAR(50) NOT NULL, 
            email VARCHAR(100) UNIQUE NOT NULL, 
            password TEXT NOT NULL, 
            phone TEXT NOT NULL, 
            role VARCHAR(10) NOT NULL
        )
    `

    const createVehicleTable = `
        CREATE TABLE IF NOT EXISTS vehicle (
            id SERIAL PRIMARY KEY, 
            vehicle_name VARCHAR(30) NOT NULL, 
            type VARCHAR(10) NOT NULL, 
            registration_number TEXT UNIQUE NOT NULL, 
            daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0), 
            availability_status VARCHAR(20) NOT NULL
        )
    `

    const createBookingsTable = `
        CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY, 
            customer_id INT REFERENCES users(id) on DELETE CASCADE, 
            vehicle_id INT REFERENCES vehicle(id) on DELETE CASCADE, 
            rent_start_date DATE NOT NULL, 
            rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date), 
            total_price INT NOT NULL CHECK (total_price > 0), 
            status VARCHAR(20) NOT NULL
        )
    `

    await pool.query(createUserTable);
    await pool.query(createVehicleTable);
    await pool.query(createBookingsTable); 
} 