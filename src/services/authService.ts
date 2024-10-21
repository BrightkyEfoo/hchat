import bcrypt from 'bcrypt';
import { AppError } from '../utils/Errors/AppError';
import { IUser } from '../types/user';
import prisma from '../database/prisma';
import dotenv from 'dotenv';
dotenv.config();

const register = async (user: IUser) => {
    try {
        const hashedPwd = await bcrypt.hash(user.password, 10);
        user.password = hashedPwd;
        const { password: _, ...newUserCopy } = await prisma.user.create({data: user});        
        return newUserCopy;
    } catch (e: any) {
        console.error(`Error when trying to save user to db \nReason:${e}`);
        return 1 as const;
    }
};


const login = async (credentials: { email: string; password: string }) => {
    try {
        const { email, password } = credentials;
        
        const user = await prisma.user.findUnique({
            where: {email},
        });

        if (!user) {
            return 'NOT_FOUND';
        }

        const resultOfComparison = await bcrypt.compare(
            password,
            user.password || '',
        );

        if (!resultOfComparison) {
            return 'INVALID_PASSWORD';
        }

        const {password: _, ...userCopy} = user
        return userCopy;
    } catch (e: any) {
        throw new AppError('ERROR', e.message, false);
    }
};


const authService = {
    register,
    login,
};

export { authService };
