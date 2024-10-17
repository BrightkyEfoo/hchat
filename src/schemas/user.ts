import { array, number, object, string } from 'zod';

const userZodSchemas = {
    register: object({
        body: object({
            email: string().email(),
            password: string().min(8),
            name: string(),
            phone: string(),
        }),
    }),
    login: object({
        body: object({
            email: string().email(),
            password: string().min(8),
        }),
    }),
};


export { userZodSchemas };
