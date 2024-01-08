import express, { Express, Request, Response, Router } from 'express';
import apiRoutes from './api';
import { login } from '../helpers/index';

const router: Router = express.Router();

router.use('/api', apiRoutes);

// path: /

router
    .route('/')
    .get((req: Request, res: Response) => {
        res.json('lol');
    })

// path: /login

router
    .route('/login')
    .post(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const x = await login(email, password);
        res.status(200).json(x);
    })

export default router;