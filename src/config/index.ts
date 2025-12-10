import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path:  path.join(process.cwd(), ".env")});

export const config = {
    PORT: process.env.PORT, 
    CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}