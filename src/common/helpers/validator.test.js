import Validator from './validator';

describe('Validator test', () => {
    it('Email validation', () => {
        expect(Validator.checkEmail('qwe')).toEqual(false);
        expect(Validator.checkEmail('123.123.ru')).toEqual(false);
        expect(Validator.checkEmail('123.@qwe.ru')).toEqual(false);
        expect(Validator.checkEmail('123@qwe.ru')).toEqual(true);
        expect(Validator.checkEmail('123@qwe.ruqwe')).toEqual(false);
        expect(Validator.checkEmail('123@qwe.~~~')).toEqual(false);
    });

    it('Name validation', () => {
        expect(Validator.checkName('Thomas')).toEqual(true);
        expect(Validator.checkName('Ilya')).toEqual(true);
        expect(Validator.checkName('Lala')).toEqual(true);
        expect(Validator.checkName('L0p')).toEqual(false);
        expect(Validator.checkName('Ilya')).toEqual(true);
        expect(Validator.checkName('Ilya1')).toEqual(false);
        expect(Validator.checkName('1Ilya')).toEqual(false);
        expect(Validator.checkName('Il.ya')).toEqual(false);
        expect(Validator.checkName('Ilya,')).toEqual(false);
    });
})