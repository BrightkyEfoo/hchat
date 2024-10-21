import { Router } from 'express';
import { usersController } from '../controllers/userController';
import { validate } from '../middlewares/validate';
import { userZodSchemas } from '../schemas/user';

const router = Router();

router.post(
  ['/register', '/signup', '/sign-up'],
  validate(userZodSchemas.register),
  usersController.register
);
router.post(
  ['/login', '/signin', '/sign-in'],
  validate(userZodSchemas.login),
  usersController.login
);

export { router as authRouter };
