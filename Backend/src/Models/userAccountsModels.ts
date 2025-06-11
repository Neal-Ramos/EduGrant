import {pool} from "../Config/dbConnect";
import { UserAccountData } from "../Types/ModelsTypes";
import { ResultSetHeader } from "mysql2";

export const getUserByEmail = async (userEmail: string): Promise<UserAccountData[]>=> {
    const [rows] = await pool.query<UserAccountData[]>("SELECT * FROM user_account WHERE userEmail = ?", [userEmail]);
    return rows;
}
export const insertNewUser= async (
    studentId: number, studentEmail: string, studentContact: number,
    HashedPassword: string, studentFirstName: string, studentMiddleName: string, studentLastName: string, studentGender: string,
    studentDateofBirth: Date, studentAddress: string, studentCourseYearSection: string): Promise<number> => {
    const [result] = await pool.query<ResultSetHeader>("INSERT INTO user_account(studentId, userEmail, contactNumber,userPassword, firstName, middleName, lastName, gender,dateOfBirth, address, studentCourseYearSection) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)",
        [studentId, studentEmail, studentContact, HashedPassword, studentFirstName, studentMiddleName, studentLastName, studentGender, studentDateofBirth, studentAddress, studentCourseYearSection]);
    return result.insertId;
}
export const getUserByID = async (userId:number): Promise<UserAccountData[]>=> {
    const [result] = await pool.query<UserAccountData[]>("SELECT * FROM user_account WHERE userId = ?",[userId]);
    return result;
}