import { JwtPayload } from "jsonwebtoken";


export interface LoginAccounts {
    studentId: string,
    userPassword: string,
    code: string
}

export interface StudentAddress {
  province: string;
  city: string;
  barangay: string;
}

export interface CourseYearSection {
  course: string;
  year: string;
  section: string;
}

export interface reqUserRegister {
    studentId: string,
    studentEmail: string,
    studentContact: string,
    studentFirstName: string,
    studentMiddleName: string,
    studentLastName: string,
    studentGender: string,
    studentAddress: StudentAddress,
    studentDateofBirth: Date,
    studentCourseYearSection: CourseYearSection,
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

export interface reqSendCodeLogin {
    studentId: string,
    userPassword: string
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