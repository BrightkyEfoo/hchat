import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { userZodSchemas } from '../schemas/user';
import { usersController } from '../controllers/userController';
// import { hydradeBody, uploadSingle } from '../../middlewares/fileStore';
import { authToken } from '../middlewares/jwt';
import { hydradeBody, uploadSingle } from '../middlewares/fileStore';

const router = Router();

router.post(['/auth/register', '/auth/signup', '/auth/sign-up'], [
        // uploadSingle('profilePicture'),
        hydradeBody,
        validate(userZodSchemas.register),
    ],
    usersController.register,
);
router.post(['/auth/login', '/auth/signin', '/auth/sign-in'], validate(userZodSchemas.login), usersController.login);

export { router as authRouter };
