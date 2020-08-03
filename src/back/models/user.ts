import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
    email: string,
    name: string,
    surname: string
}

const schema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    surname: String
});

export default mongoose.model<IUser>('user', schema);