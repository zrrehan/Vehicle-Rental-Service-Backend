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

type updatedUserPayload = {
    name? : string, 
    email? : string, 
    phone? : string, 
    role? : string,
}
const serviceUpdateUser = async(userId: number, payload: updatedUserPayload) => {
    // preventing SQL injection 
    const payloadKeys = ["name", "email", "phone", "role"];
    for(const key in payload) {
        if(!payloadKeys.includes(key)) {
            throw new Error("One or more request parameters are not allowed.");
        }
    }

    let index = 1
    let query = "UPDATE users SET "
    for(const key in payload) {
        query += `${key} = $${index}, `;
        index += 1;
    }
    query = query.slice(0, query.length - 2);
    query += ` WHERE id = $${index} RETURNING id, name, email, phone, role`;

    console.log(query);

    const result = await pool.query(query, [...Object.values(payload), userId]);
    return result.rows;
}   

export const userServices = {
    serviceGetAllUser, 
    serviceDeleteUser, 
    serviceUpdateUser
}