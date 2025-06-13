import { OkPacket } from "mysql2";
import {pool} from "../Config/dbConnect";
import { SecurityCodeData } from "../Types/ModelsTypes";

export const getCodeByEmailRegistration = async (userEmail:string, origin:string): Promise<SecurityCodeData[]>=> {
    const [rows] = await pool.query<SecurityCodeData[]>("SELECT * FROM security_code WHERE receiver = ?  AND origin = ?",
        [userEmail, origin]);
    return rows;
}
export const selectExistingCodeByEmailOrigin = async (userEmail:string, origin:string): Promise<SecurityCodeData[]>=> {
    const [rows] = await pool.query<SecurityCodeData[]>("SELECT * FROM security_code WHERE receiver = ?  AND origin = ?",
        [userEmail, origin]);
    return rows;
}
export const selectCodeByCodeEmailOrigin = async (code:string, userEmail:string, origin:string): Promise<SecurityCodeData[]>=> {
    const [result] = await pool.query<SecurityCodeData[]>("SELECT * FROM security_code WHERE BINARY code = ? AND BINARY receiver = ? AND origin = ?",
        [code, userEmail, origin]);
    return result;
}
export const deleteCodeByEmailOrigin = async (userEmail:string, origin:string)=> {
    const [result] = await pool.query("DELETE FROM security_code WHERE receiver = ? AND origin = ?",
        [userEmail, origin]);
    return result;
}
export const insertCode = async (origin:string, userEmail:string, sendCode:string, expiresAt:any) => {
    const [result] = await pool.query("INSERT INTO security_code(origin, receiver, code, expiryDate) VALUES (?, ?, ?, ?)",
        [origin, userEmail,sendCode, expiresAt]);
    return result;
}