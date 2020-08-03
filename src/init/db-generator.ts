import {Model} from 'mongoose';

import {DBType} from '@back/models';
import {IUser} from '@back/models/user';
import users from './users'

export default class Generator {
    static db: DBType;

    static async init(db: DBType) {
        this.db = db;
        await Generator.generate();
    }

    static async generate() {
        await Generator.setData(
            'user',
            users,
            async (item: IUser, model: Model<IUser>) => await new model(item).save()
        );
    }

    static async setData(
        collection: string,
        data: Array<IUser>,
        handler: (item: IUser, model: Model<IUser>) => Promise<IUser>
    ) {
        await this.db[collection].deleteMany({});
        for (const item of data)
            await handler(item, this.db[collection]);
    }
}