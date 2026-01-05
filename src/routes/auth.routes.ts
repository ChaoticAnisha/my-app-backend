import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', (req, res, next) => authController.register(req, res, next));
authRouter.post('/login', (req, res, next) => authController.login(req, res, next));

export { authRouter };