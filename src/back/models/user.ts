import mongoose, {Schema, Document} from 'mongoose';

import Validator from '@common/helpers/validator';

export interface IUser extends Document {
    email: string,
    name: string,
    surname: string
}

const schema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Email address is required',
        lowercase: true,
        validate: [Validator.checkEmail, 'please fill a valid email address']
    },
    name: {
        type: String,
        validate: [Validator.checkName, 'only letters in a name']
    },
    surname:  {
        type: String,
        validate: [Validator.checkName, 'only letters in a surname']
    }
});

export default mongoose.model<IUser>('user', schema);