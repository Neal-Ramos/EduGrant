import { PrismaClient, user_accounts } from "../generated/prisma";
const prisma = new PrismaClient()

export const getUserByEmail = async (userEmail: string): Promise<user_accounts[]>=> {
    const result = await prisma.user_accounts.findMany({
        where:{
            studentEmail: userEmail
        }
    });
    return result;
}
export const getUserByStudentId = async (studentId: string): Promise<user_accounts[]>=> {
    const result = await prisma.user_accounts.findMany({
        where:{
            studentId: studentId
        }
    });
    return result;
}
export const insertNewUser= async (
    studentId: string, studentEmail: string, studentContact: string,
    HashedPassword: string, studentFirstName: string, studentMiddleName: string, studentLastName: string, studentGender: string,
    studentDateofBirth: Date, studentAddress: object, studentCourseYearSection: object): Promise<number> => {
    
    const newUser = await prisma.user_accounts.create({
        data:{
            studentId: studentId,
            studentEmail: studentEmail,
            contactNumber: studentContact,
            userPassword: HashedPassword,
            firstName: studentFirstName,
            middleName: studentMiddleName,
            lastName: studentLastName,
            gender: studentGender,
            dateOfBirth: studentDateofBirth,
            address: studentAddress,
            studentCourseYearSection: studentCourseYearSection
        }
    });
    return newUser.userId
}
export const getUserByID = async (userId:number): Promise<user_accounts[]>=> {
    const result = await prisma.user_accounts.findMany({
        where:{
            userId: userId
        }
    })
    return result;
}