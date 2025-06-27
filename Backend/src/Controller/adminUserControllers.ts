import { NextFunction, Request, Response } from "express";

export const adminLogout = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
        res.status(200).json({ success: true, message: "Logged out successfully!" });
    } catch (error) {
        next(error);
    }
};