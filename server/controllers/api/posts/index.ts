import express, { Express, Request, Response, Router } from 'express';

const router: Router = express.Router();

// path: /api/posts

router
    .route('/')
    .get(async (req: Request, res: Response) => {

    })
    .post(async (req: Request, res: Response) => {

    });

export default router;