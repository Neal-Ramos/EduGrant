import { PrismaClient, security_code } from "../generated/prisma";
const prisma = new PrismaClient()

export const getCodeByEmailRegistration = async (userEmail:string, origin:string): Promise<security_code[]>=> {
    const result = await prisma.security_code.findMany({
        where: {
            receiver: userEmail,
            origin: origin
        }
    });
    return result;
}
export const selectExistingCodeByEmailOrigin = async (userEmail:string, origin:string): Promise<security_code[]>=> {
    const result = await prisma.security_code.findMany({
        where: {
            receiver: userEmail,
            origin: origin
        }
    });
    return result;
}
export const selectCodeByCodeEmailOrigin = async (code:string, userEmail:string, origin:string): Promise<security_code[]>=> {
    const result = await prisma.security_code.findMany({
        where:{
            code: code,
            receiver: userEmail,
            origin: origin
        }
    })
    return result;
}
export const deleteCodeByEmailOrigin = async (userEmail:string, origin:string)=> {
    const result = await prisma.security_code.deleteMany({
        where: {
            receiver: userEmail,
            origin: origin
        }
    })
    return result.count;
}
export const insertCode = async (origin:string, userEmail:string, sendCode:string, expiresAt:any) => {
    const result = await prisma.security_code.create({
        data: {
            origin: origin,
            receiver: userEmail, 
            code: sendCode,
            expiryDate: expiresAt
        }
    });
    return result.codeId;
}