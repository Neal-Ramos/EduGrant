import { JwtPayload } from "jsonwebtoken";


export interface LoginAccounts {
    userEmail: string,
    userPassword: string
}

export interface reqUserRegister {
    studentId: number,
    studentEmail: string,
    studentContact: number,
    studentFirstName: string,
    studentMiddleName: string,
    studentLastName: string,
    studentGender: string,
    studentAddress: string,
    studentDateofBirth: Date,
    studentCourseYearSection: string,
    studentPassword: string,
    verificationCode : string
}

export interface reqSendCodeRegister {
    studentId: number,
    studentEmail: string,
    studentContact: number,
    studentFirstName: string,
    studentMiddleName: string,
    studentLastName: string,
    studentGender: string,
    studentAddress: string,
    studentDateofBirth: Date,
    studentCourseYearSection: string
    studentPassword: string,
}

export interface LoginCodeAuth {
    code: string,
    origin: string,
    userEmail: string,
    userPassword: string
}

export interface RegisterCodeAuth {
    code: string,
    origin: string,
    firstName: string, 
    middleName: string,
    lastName: string,
    userEmail: string,
    userPassword: string
}

export interface TokenPayload extends JwtPayload {
  userID: number;
  role: string;
}