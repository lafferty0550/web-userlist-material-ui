import mongoose from 'mongoose';

import user from './user';

export type DBType = { [key: string]: any };

export default {mongoose, user} as DBType;