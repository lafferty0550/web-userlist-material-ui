import axios from 'axios';

export type UserModel = { email: string, name?: string, surname?: string };

export default class {
    static request = axios.create({
        baseURL: (process.env.NODE_ENV === 'production')
            ? 'https://evening-waters-00743.herokuapp.com/api'
            : 'http://localhost:3000/api'
    });

    static async getUsers() {
        const res = await this.request.get('/users');
        return res.data;
    };

    static async createUser(user: UserModel) {
        const res = await this.request.post('/users', user);
        return res.data;
    };
};