import express, { Express, Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { addMember, deleteUser } from '../../../helpers';

const router: Router = express.Router();
const prisma = new PrismaClient();

// path: /api/users

router
    .route('/')
    .get(async (req: Request, res: Response) => {
        const read = await prisma.user.findMany();
        res.json(read);
    })
    .post(async (req: Request, res: Response) => {

        const { emailInp, nameInp } = req.body;

        // run validations here //

        const newMember = await addMember(emailInp, nameInp);
        res.status(200).json(newMember);

    })
    .delete(async (req: Request, res: Response) => {

        const { userId } = req.body;

        const deletedMember = await deleteUser(userId);
        res.status(200).json(deletedMember);

    })

router
    .route('/:memberId')
    .get(async (req: Request, res: Response) => {
        console.log('arrived')
        const memberId = Number(req.params.memberId);
        const query = await prisma.user.findUnique({
            where: {
                id: memberId,
            }
        });
        console.log(query);
        res.status(200).json(query);
    })

export default router;