import express, { Express, Request, Response, Router } from 'express';
import { addComment, addPost, getAllPosts, getSinglePost } from '../../../helpers';

const router: Router = express.Router();

// path: /api/posts

router
    .route('/')
    .get(async (req: Request, res: Response) => {
        const results = await getAllPosts();
        res.status(200).json(results);
    })
    .post(async (req: Request, res: Response) => {
        const { userId, content } = req.body;
        const results = await addPost(userId, content);
        res.status(200).json(results);
    });

router
    .route('/:postId')
    .get(async (req: Request, res: Response) => {
        const postId = Number(req.params.postId);
        const results = await getSinglePost(postId);
        res.status(200).json(results);
    })

router
    .route('/comments')
    .post(async (req: Request, res: Response) => {
        const { postId, userId, content } = req.body;
        const results = await addComment(postId, userId, content);
        res.status(200).json(results);
    });

export default router;