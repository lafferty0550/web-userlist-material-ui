import {Request, Response} from 'express';

import db from '../models';
import {CREATED_SUCCESS} from '../constants';

export const getUsers = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            users: await db.user.find({}, {__v: 0})
        });
    } catch (err) {
        console.log(err.toString());
        res.status(500).json({
            success: false,
            msg: `Error while getting: ${err.toString()}`
        });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        await db.user.create(req.body);
        res.status(200).json({
            success: true,
            msg: CREATED_SUCCESS
        });
    } catch (err) {
        console.log(err.toString());
        res.status(500).json({
            success: false,
            msg: `Error while creating: ${err.toString()}`
        });
    }
}