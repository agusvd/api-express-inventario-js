import { Router } from 'express';

import { signup } from '../controllers/auth.js';

const AuthRoutes = Router();

AuthRoutes.post('/signup', signup)

export default AuthRoutes;