import { Router } from 'express';

import { signup, login } from '../controllers/auth.js';

const AuthRoutes = Router();

AuthRoutes.post('/signup', signup)
AuthRoutes.post('/login', login)

export default AuthRoutes;