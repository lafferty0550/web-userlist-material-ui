import mongoose, {Schema, Document} from 'mongoose';

import Validator from '../../common/helpers/validator';
import {
    EMAIL_VALIDATION_ERROR,
    NAME_VALIDATION_ERROR,
    SURNAME_VALIDATION_ERROR
} from '../constants';

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
        validate: [Validator.checkEmail, EMAIL_VALIDATION_ERROR]
    },
    name: {
        type: String,
        validate: [Validator.checkName, NAME_VALIDATION_ERROR]
    },
    surname:  {
        type: String,
        validate: [Validator.checkName, SURNAME_VALIDATION_ERROR]
    }
});

export default mongoose.model<IUser>('user', schema);