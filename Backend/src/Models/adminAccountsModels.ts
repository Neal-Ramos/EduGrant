import { RowDataPacket } from "mysql2";
import { pool } from "../Config/dbConnect";
import { AdminData } from "../Types/ModelsTypes";

export const getAdminByEmailPassword = async (adminEmail: string, adminPassword: string): Promise<AdminData[]>=> {
    const [rows]  = await pool.query<AdminData[]>("SELECT * FROM admin_accounts WHERE BINARY adminEmail = ? AND BINARY adminPassword = ?", [adminEmail, adminPassword]);
    return rows;
}
export const getAdminByEmail = async (adminEmail: string): Promise<AdminData[]>=> {
    const [rows] = await pool.query<AdminData[]>("SELECT * FROM admin_accounts WHERE BINARY email = ?", [adminEmail]);
    return rows;
}