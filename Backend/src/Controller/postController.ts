import { Response, Request } from "express"
import * as Models from "../Models/scholarshipsModels"
import * as Types from "../Types/userPostTypes"

export const getAllScholarships = async (req: Request, res: Response): Promise<void>=> {
    try {
        console.log(req.cookies.token)
        const getAllScholarships = await Models.getAllScholarships()
        res.status(200).json(getAllScholarships)
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error!!!", error:(error as {message: string}).message})
    }
}
export const getScholarshipsbyId = async (req: Request, res: Response): Promise<void>=> {
    try {
        const {scholarshipId} = req.body as Types.getScholarshipsbyID;
        if(!scholarshipId){
            res.status(400).json({success:false, message:"No Id"});
            return;
        }
        const getScholarshipsById = await Models.getScholarshipsById(scholarshipId)
        res.status(200).json({success:true, message:"Get Success!", getScholarshipsById});
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"})
    }
}