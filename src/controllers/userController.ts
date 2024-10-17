import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { AppError } from '../utils/Errors/AppError';
import { authService } from '../services/authService';

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRes = await authService.register(req.body);
        if (userRes === 1) {
            throw new AppError('ERROR', `Something went wrong on db when creating user`, true);
        }
        res.status(201).json({
            msg: 'successfully created a new user',
            user: userRes,
        });
    } catch (err: any) {
        const error = AppError.isAppError(err)
            ? err
            : new AppError('ERROR', `Unknown error \nReason : ${err}`, false);
        next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const credentials = { email, password };
        const loginResponse = await authService.login(credentials);
        if (loginResponse === 1 || loginResponse === 2) {
            throw new AppError(
                'NOT_AUTHORIZED',
                'Either your email or your password is incorrect',
                true,
            );
        }

        const private_key = process.env.PRIVATE_KEY;
        if (!private_key) {
            throw new AppError(
                'BAD_ENTRY',
                'Env variable PRIVATE_KEY should be defined',
                false,
            );
        }
        const token = jwt.sign(
            {
                userId: loginResponse._id,
                random: randomUUID(),
                appName: 'ecommerce',
                roles: loginResponse.roles,
            },
            private_key,
            { expiresIn: '24h' },
        );

        res.json({
            msg: 'Succesfully logged in',
            token,
            user: loginResponse,
        });
    } catch (err: any) {
        const error = AppError.isAppError(err)
            ? err
            : new AppError('ERROR', `Unknown error \nReason : ${err}`, false);
        next(error);
    }
};


const usersController = {
    register,
    login
};

export { usersController };
