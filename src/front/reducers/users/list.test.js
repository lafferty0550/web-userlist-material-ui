import listReducer from './list';
import {
    FETCH_PENDING,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    createAction
} from '@actions/users/list';
import users from '@init/users';

describe('fetch users reducer', () => {
    it('fetch user list pending', () => {
        const newState = listReducer(undefined, createAction(FETCH_PENDING));
        expect(newState.pending).toEqual(true);
        expect(newState.success).toEqual(true);
        expect(newState.msg).toEqual('');
        expect(newState.data.length).toEqual(0);
    });

    it('success fetch user list pending', () => {
        const newState = listReducer(undefined, createAction(FETCH_SUCCESS, users));
        expect(newState.pending).toEqual(false);
        expect(newState.success).toEqual(true);
        expect(newState.msg).toEqual('');
        expect(newState.data.length).not.toEqual(0);
    });

    it('failed fetch user list pending', () => {
        const newState = listReducer(undefined, createAction(FETCH_FAILURE, users, 'failed'));
        expect(newState.pending).toEqual(false);
        expect(newState.success).toEqual(false);
        expect(newState.msg).toEqual('failed');
        expect(newState.data.length).toEqual(0);
    });
})