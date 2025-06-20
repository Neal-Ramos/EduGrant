import { PrismaClient, scholarships } from "../generated/prisma";
const prisma = new PrismaClient();

export const insertScholarships = async (newScholarName:string, newScholarDeadline:any, newScholarDescription:string,
    requirements:any, sponsorLogo:any, coverImg:any, scholarshipApplicationForm:any) => {
    const result = await prisma.scholarships.create({
        data: {
            scholarshipName: newScholarName,
            scholarshipDealine: newScholarDeadline,
            scholarshipLogo: sponsorLogo,
            scholarshipCover: coverImg,
            scholarshipApplicationForm: scholarshipApplicationForm,
            scholarshipDescription: newScholarDescription,
            scholarshipDocuments: requirements,
        }
    })
    return result.scholarshipId;
}
export const getAllScholarships = async (): Promise<scholarships[]>=> {
    const result = await prisma.scholarships.findMany()
    return result;
}
export const getScholarshipsById = async (id: number): Promise<scholarships[]>=> {
    const result = await prisma.scholarships.findMany({
        where: {
            scholarshipId: id
        }
    });
    return result;
}
 