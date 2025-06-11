import {pool} from "../Config/dbConnect";
import { UserAccountData } from "../Types/ModelsTypes";

export const getUserByEmail = async (userEmail: string): Promise<UserAccountData[]>=> {
    const [rows] = await pool.query<UserAccountData[]>("SELECT * FROM user_account WHERE userEmail = ?", [userEmail]);
    return rows;
}
export const insertNewUser = async (firstName:string, middleName:string, lastName:string, userEmail:string, encryptPassword:string) => {
    const [rows] = await pool.query("INSERT INTO user_account(firstName, middleName, lastName, userEmail, userPassword) VALUES(?, ?, ?, ?, ?)",
        [firstName, middleName, lastName, userEmail, encryptPassword]);
    return rows;
}
export const getUserByID = async (userId:number): Promise<UserAccountData[]>=> {
    const [result] = await pool.query<UserAccountData[]>("SELECT * FROM user_account WHERE userId = ?",[userId]);
    return result;
}