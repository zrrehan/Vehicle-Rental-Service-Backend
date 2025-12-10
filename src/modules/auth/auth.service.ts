import { pool } from "../../config/db"
import bcrypt from "bcrypt";

const serviceCreateUser = async (name: string, email: string, password: string, phone: string, role: string) => {
    if(password.length < 6) {
        return {message: "Minimum Password Length 6 Required"}
    }

    const hashedPass = await bcrypt.hash(password, 10);

    try {
        const query = `
            INSERT INTO 
            users(name, email, password, phone, role)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
        `
        const result = await pool.query(query, [name, email, hashedPass, phone, role]);
        
        return {
            userInfo: result.rows[0]
        }
    } catch(error: any) {
        return {message: error.message}
    }
}

const loginUser = async() => {

}

export const authServices = {
    serviceCreateUser
}