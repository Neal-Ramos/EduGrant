import { NextFunction, Request, Response } from "express";

export const adminLogout = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
        res.clearCookie("token", {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production"? "none":"lax",
            maxAge:60000 * 60 * 24 * 7,
            path:"/administrator"
        });
        res.status(200).json({ success: true, message: "Logged out successfully!" });
    } catch (error) {
        next(error);
    }
};