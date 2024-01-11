import express, { Express, Request, Response, Router } from 'express';
import usersRoutes from './users';
import classesRoutes from './classes';
import wodRoutes from './wod'
import postsRoutes from './posts'

const router: Router = express.Router();

router.use('/users', usersRoutes);
router.use('/classes', classesRoutes);
router.use('/wod', wodRoutes);
router.use('/posts', postsRoutes);

// path: /api

export default router;