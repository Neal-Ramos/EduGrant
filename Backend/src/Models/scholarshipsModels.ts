import { pool } from "../Config/dbConnect";
import { ScholarshipData } from "../Types/ModelsTypes";

export const insertScholarships = async (newScholarName:string, newScholarDeadline:any, newScholarDescription:string, requirements:any, sponsorLogo:any, coverImg:any, scholarshipApplicationForm:any)=> {
    const [result] = await pool.query("INSERT INTO scholarships(scholarshipName, scholarshipDealine, scholarshipLogo, scholarshipCover, scholarshipDescription, scholarshipDocuments, scholarshipApplicationForm) VALUES(?, ?, ?, ?, ?, ?, ?)",
        [newScholarName, newScholarDeadline, sponsorLogo, coverImg, newScholarDescription, requirements, scholarshipApplicationForm]);
    return result;
}
export const getAllScholarships = async (): Promise<ScholarshipData[]>=> {
    const [rows] = await pool.query<ScholarshipData[]>("SELECT * FROM scholarships");
    return rows;
}
export const getScholarshipsById = async (id: number): Promise<ScholarshipData[]>=> {
    const [rows] = await pool.query<ScholarshipData[]>("SELECT * FROM scholarships WHERE BINARY scholarshipId = ?", [id]);
    return rows;
}