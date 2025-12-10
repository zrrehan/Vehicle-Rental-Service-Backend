import { pool } from "../../config/db"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";

const serviceCreateUser = async (name: string, email: string, password: string, phone: string, role: string) => {
    if(password.length < 6) {
        return {success: false, message: "Minimum Password Length 6 Required"}
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
            success: true,
            userInfo: result.rows[0]
        }
    } catch(error: any) {
        return {success: false, message: error.message}
    }
}

const loginUser = async(email: string, password: string) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    
    if(result.rows.length === 0) {
        return {success: false, message: "Email Didn't Match"}
    }

    const passMatched = await bcrypt.compare(password, result.rows[0].password);

    if(!passMatched) {
        return {success: false, message: "Wrong Passoword"}
    }
    const {password: string, ...userInfoWithoutPassword} = result.rows[0];
    const token = jwt.sign(userInfoWithoutPassword, config.JWT_SECRET_KEY || "", {
        expiresIn: "7d"
    })
    return {
        success: true,
        userInfo: userInfoWithoutPassword, 
        token: token 
    }
}

export const authServices = {
    serviceCreateUser, 
    loginUser
}