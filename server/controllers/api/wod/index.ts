import express, { Express, Request, Response, Router } from 'express';
import { addWOD, deleteWod, getAllWod, getWodsFromDate } from '../../../helpers';

const router: Router = express.Router();

// path: /api/wod

router
    .route('/')
    .get(async (req: Request, res: Response) => {
        // GET ALL WODs
        const wodList = await getAllWod();
        res.status(200).json(wodList);
    })
    .post(async (req: Request, res: Response) => {

        const { name, content, dateOf } = req.body;

        const newWOD = await addWOD(name, content, dateOf);
        console.log(newWOD);
        if (newWOD.code === 1) res.status(200).json(newWOD);
        else res.status(400);

    })
    .delete(async (req: Request, res: Response) => {

        const { wodId } = req.body;

        const deletedWod = await deleteWod(wodId);
        if (deletedWod.code === 1) res.status(200).json(deletedWod);
        else res.status(400);

    });

router
    .route('/:dateOf')
    .get(async (req: Request, res: Response) => {
        const dateOf = new Date(req.params.dateOf);
        const getWods = await getWodsFromDate(dateOf);
        res.status(200).json(getWods)
    })

export default router;