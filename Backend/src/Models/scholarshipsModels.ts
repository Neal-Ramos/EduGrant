import { PrismaClient, scholarships } from "../generated/prisma";
const prisma = new PrismaClient();

type getScholarships = {
    scholarshipId: number,
    scholarshipTitle: string,
    scholarshipProvider: string,
    scholarshipDealine: Date
}

export const insertScholarships = async (newScholarTitle:string, newScholarProvider:string, newScholarDeadline:any, newScholarDescription:string,
    requirements:any, sponsorLogo:any, coverImg:any) => {//, scholarshipApplicationForm:any
    const result = await prisma.scholarships.create({
        data: {
            scholarshipTitle:newScholarTitle,
            scholarshipProvider: newScholarProvider,
            scholarshipDealine: newScholarDeadline,
            scholarshipLogo: sponsorLogo,
            scholarshipCover: coverImg,
            scholarshipDescription: newScholarDescription,
            scholarshipDocuments: requirements,
        }
    })
    return result.scholarshipId;
}
export const getAllScholarships = async (): Promise<getScholarships[]>=> {
    const result = await prisma.scholarships.findMany({
        select:{
            scholarshipId: true,
            scholarshipTitle: true,
            scholarshipProvider: true,
            scholarshipDealine: true
        }
    })
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
export const deleteScholarshipById = async (scholarshipId: number): Promise<number>=> {
    const result = await prisma.scholarships.deleteMany({
        where:{
            scholarshipId: scholarshipId
        }
    });
    return result.count;
}
 