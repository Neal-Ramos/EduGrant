import { RowDataPacket } from "mysql2";


export interface AdminData extends RowDataPacket{
    adminId: number,
    adminEmail: string,
    adminPassword: string
}

export interface ScholarshipData extends RowDataPacket {
    scholarshipId: number,
    scholarshipName: string,
    scholarshipDealine: Date,
    scholarshipLogo: string,
    scholarshipCover: string,
    scholarshipApplicationForm: string,
    scholarshipDescription: string,
    scholarshipDocuments: string,
    totalApplicants:number,
    totalApproved: number
}

export interface SecurityCodeData extends RowDataPacket {
    codeId: number,
    origin: string,
    receiver: string,
    code: string,
    expiryDate: Date
}

export interface UserAccountData extends RowDataPacket {
    userID: number,
    firstName: string,
    middleName: string,
    lastName: string,
    userEmail: string,
    userPassword: string,
    gender: string,
    contactNumber: string,
    address: string,
    birthDay: Date
}