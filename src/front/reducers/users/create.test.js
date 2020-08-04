import {
    CREATE_PENDING,
    CREATE_SUCCESS,
    CREATE_FAILURE,
    createAction
} from '@actions/users/create';
import listReducer from './create';

describe('create user reducer', () => {
    it('creating user pending', () => {
        const newState = listReducer(undefined, createAction(CREATE_PENDING));
        expect(newState.pending).toEqual(true);
        expect(newState.success).toEqual(true);
        expect(newState.msg).toEqual('');
    });

    it('creating user success', () => {
        const newState = listReducer(undefined, createAction(CREATE_SUCCESS, 'success'));
        expect(newState.pending).toEqual(false);
        expect(newState.success).toEqual(true);
        expect(newState.msg).toEqual('success');
    });

    it('creating user failure', () => {
        const newState = listReducer(undefined, createAction(CREATE_FAILURE, 'failure'));
        expect(newState.pending).toEqual(false);
        expect(newState.success).toEqual(false);
        expect(newState.msg).toEqual('failure');
    });
});