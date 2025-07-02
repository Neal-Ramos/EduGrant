import { Request, Response } from "express";
import { adminAddScholarshipsData, getScholarshipsData } from "../Types/adminPostTypes";
import cloudinary from "../Config/cloudinary";
import {v4 as uuidv4} from "uuid";
import { getAllScholarships, getScholarshipsById, insertScholarships } from "../Models/scholarshipsModels";
import { createReadStream } from "streamifier";
import { json } from "stream/consumers";

export const adminAddScholarships = async (req: Request, res: Response): Promise<void>=> {
    try {
      const {
        newScholarTitle,
        newScholarProvider,
        newScholarDeadline,
        newScholarDescription,
        requirements,
      } = req.body as adminAddScholarshipsData;
    
      const sponsorLogo = (req.files as Express.Multer.File[]).find(file => file.fieldname === 'sponsorLogo');
      const coverImg = (req.files as Express.Multer.File[]).find(file => file.fieldname === 'coverImg');
      // const applicationForm = (req.files as Express.Multer.File[]).find(file => file.fieldname === 'applicationForm');
    
      if (
        !newScholarTitle ||
        !newScholarProvider||
        !newScholarDeadline ||
        !newScholarDescription ||
        !sponsorLogo ||
        !coverImg 
        //|| !applicationForm
      ) {
          res.status(400).json({
          success: false,
          message: 'Fill all Credentials!',
        });
        return;
      }
      const streamUpload = (fileBuffer: any, folderName: any) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: 'scholarship-files',
              public_id: `${folderName}-${Date.now()}-${uuidv4()}`,
              resource_type: 'auto', // You can change to 'auto' if mixing file types
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          createReadStream(fileBuffer).pipe(stream);
        });
      };
  
      const sponsorResult: any = await streamUpload(sponsorLogo.buffer, `${newScholarTitle}-Logo`);
      const coverResult: any = await streamUpload(coverImg.buffer, `${newScholarTitle}-Cover`);

      const insertScholarshipsData = await insertScholarships(
        newScholarTitle,
        newScholarProvider,
        new Date(newScholarDeadline),
        newScholarDescription,
        JSON.parse(req.body.requirements),
        sponsorResult.secure_url,
        coverResult.secure_url,
        // formResult.secure_url
      );
      if(!insertScholarshipsData){
        res.status(500).json({success: false, message: "Database Errro"});
        return;
      }
      res.status(200).json({success: true,message: 'Scholarship Added!'});
    } catch (error) {
      console.log(error)
      res.status(500).json({success: false,message: 'Scholarship Not Added!',error: (error as {message: string}).message,});
    }
};

export const getScholarships = async (req: Request, res: Response): Promise<void>=> {
  try {
    const getScholarshipsData = await getAllScholarships()
    res.status(200).json(getScholarshipsData)
  } catch (error) {
    res.status(500).json({success:false, message:"Internal Server Error!!!", error:(error as {message: string}).message})
  }
}

export const GetScholarshipsById = async (req: Request, res: Response): Promise<void>=> {
  const {scholarshipId} = req.body as getScholarshipsData;
  if(!scholarshipId){
    res.status(400).json({success:false, message:"No Id"});
    return;
  }
  try {
      const getScholarshipsByIdData = await getScholarshipsById(scholarshipId)
      res.status(200).json({success:true, message:"Get Success!", getScholarshipsByIdData});
  } catch (error) {
      res.status(500).json({success:false, message:"Server Error"});
  }
}