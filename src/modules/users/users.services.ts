import { pool } from "../../config/db";

const serviceGetAllUser = async() => {
    const query = "SELECT id, name, email, phone, role FROM users";
    const result = await pool.query(query);
    return result.rows;
}

const serviceDeleteUser = async(userId: number) => {
    const query = "DELETE FROM users WHERE id = $1 RETURNING *";
    const result = pool.query(query, [userId]);
    return result;
}

export const userServices = {
    serviceGetAllUser, 
    serviceDeleteUser
}