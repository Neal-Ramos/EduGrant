import { JwtPayload } from "jsonwebtoken";


export interface LoginAccounts {
    userEmail: string,
    userPassword: string
}

export interface CodeOrigin {
    code: string,
    origin: string
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