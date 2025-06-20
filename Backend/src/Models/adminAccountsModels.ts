import { admin_accounts, PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const getAdminByEmailPassword = async (adminEmail: string, adminPassword: string): Promise<admin_accounts[]>=> {
    const restult = prisma.admin_accounts.findMany({
        where:{
            adminEmail: adminEmail,
            adminPassword: adminPassword
        }
    });
    return restult;
}
export const getAdminByEmail = async (adminEmail: string): Promise<admin_accounts[]>=> {
    const result = prisma.admin_accounts.findMany({
        where:{
            adminEmail: adminEmail
        }
    });
    return result;
}