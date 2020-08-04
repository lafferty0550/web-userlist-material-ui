export default class {
    static checkEmail(email: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
    static checkName(name: string) {
        return /^([a-zA-Zа-яА-Я]?)+$/.test(name);
    }
}