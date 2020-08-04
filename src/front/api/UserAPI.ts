import axios from 'axios';

export type UserModel = { email: string, name?: string, surname?: string };

export const instance = axios.create({
    baseURL: (process.env.NODE_ENV === 'production')
        ? 'https://evening-waters-00743.herokuapp.com/api'
        : 'http://localhost:3000/api'
});

export default class {
    static async getUsers() {
        const res = await instance.get('/users');
        return res.data;
    };

    static async createUser(user: UserModel) {
        const res = await instance.post('/users', user);
        return res.data;
    };
};