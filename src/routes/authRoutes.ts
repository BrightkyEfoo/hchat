import { Router } from 'express';
import { usersController } from '../controllers/userController';
import { hydradeBody } from '../middlewares/fileStore';
import { validate } from '../middlewares/validate';
import { userZodSchemas } from '../schemas/user';

const router = Router();

router.post(['/auth/register', '/auth/signup', '/auth/sign-up'], [
        hydradeBody,
        validate(userZodSchemas.register),
    ],
    usersController.register,
);
router.post(['/auth/login', '/auth/signin', '/auth/sign-in'], validate(userZodSchemas.login), usersController.login);

export { router as authRouter };
