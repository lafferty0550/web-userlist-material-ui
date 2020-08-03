import {Request, Response} from 'express';

import db from '../models';

export const getUsers = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            users: await db.user.find({}, {__v: 0})
        });
    } catch (err) {
        console.error(err.toString());
        res.status(500).json({
            success: false,
            msg: 'Error while getting'
        });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        await db.user.create(req.body);
        res.status(200).json({
            success: true,
            msg: 'Created successfully'
        });
    } catch (err) {
        console.error(err.toString());
        res.status(500).json({
            success: false,
            msg: 'Error while creating'
        });
    }
}