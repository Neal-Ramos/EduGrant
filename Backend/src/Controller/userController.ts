import { NextFunction, Request, Response } from "express"
import { getUserByID } from "../Models/userAccountsModels";
import { reqUserData } from "../Types/userPostTypes";


export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure:process.env.NODE_ENV === "production",
            maxAge: 60000 * 60 * 24 * 7,
            sameSite: process.env.NODE_ENV === "production"? "none":"lax",
            path:"/"
        });
        res.status(200).json({ success: true, message: "Logged out successfully!" });
    } catch (error) {
        next(error);
    }
}

export const getUserData = async(req: Request, res: Response, next: NextFunction): Promise<void>=> {
    try {
        const  id  = Number(req.body.id)
        if(!id){
            res.status(400).json({success: false, message: "No Id Provided!!"});
            return;
        }
        const getUser = await getUserByID(id)
        console.log(getUser)
        if(getUser.length === 0){
            res.status(400).json({success: false, message: "User Does not Exist!!"});
            return;
        }
        res.status(200).json({success: true, getUser})
    } catch (error) {
        next(error);
    }
}