import express, { Express, Request, Response, Router } from 'express';
import { Class, deleteClass } from '../../../helpers'
import {
    addClass,
    getClasses,
    batchAddSessions,
    getSelectClass,
    getSessionFromClass,
    attendSession,
    unattendSession,
    getAttendees,
} from '../../../helpers';

const router: Router = express.Router();

// path: /api/classes

router
    .route('/')
    // GET ALL CLASSES
    .get(async (req: Request, res: Response) => {
        const readClasses = await getClasses();
        res.status(200).json(readClasses);
    })
    // ADD A CLASS, AND ADD SESSIONS FOR UP TO 4 WEEKS FOR THAT CLASS
    .post(async (req: Request, res: Response) => {

        const newClass = await addClass(req.body); // Add the class to the DB 
        const selectClass: any = await getSelectClass(newClass.data.id); // Get the added class from the DB
        const newBatchSessions = await batchAddSessions(selectClass); // add 4 weeks of sessions to the class

        res.status(200).json(newBatchSessions);

    })
    .delete(async (req: Request, res: Response) => {

        const { classId } = req.body;

        const deletedClass = await deleteClass(classId);

        if (deletedClass.code === 1) res.status(200).json(deletedClass);
        else res.status(400);

    })

router
    .route('/session/:classId.:date')
    // 
    .get(async (req: Request, res: Response) => {
        const classId = Number(req.params.classId);
        const date = new Date(req.params.date);
        const session = await getSessionFromClass(classId, date)
        res.status(200).json(session);
    })

router
    .route('/session/attendees')
    // GET ATTENDEES OF ALL SESSIONS
    .post(async (req: Request, res: Response) => {

        const { attendeesId } = req.body;
        const query = await getAttendees(attendeesId);
        res.status(200).json(query);

    })
    // ADD USER TO SESSION ATTENDANCE
    .put(async (req: Request, res: Response) => {
        const { memberId, sessionId } = req.body;
        const query = await attendSession(memberId, sessionId);
        res.status(200).json(query);
    })
    // REMOVE USER FROM SESSION ATTENDANCE
    .delete(async (req: Request, res: Response) => {
        const { memberId, sessionId, attendeeId } = req.body;
        const query = await unattendSession(memberId, sessionId, attendeeId);
        res.status(200).json(query);
    })

router
    .route('/session/attendees/:sessionId')
    // GET ATTENDEES OF A SINGLE SESSION
    .get(async (req: Request, res: Response) => {

        const sessionId = Number(req.params.sessionId);
        const query = await getAttendees(sessionId);
        res.status(200).json(query);

    })

export default router;