import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    CREATE_PENDING,
    CREATE_SUCCESS,
    CREATE_FAILURE,
    createAction
} from './create';
import createUser from './create';
import {instance} from '@api/UserAPI';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(instance);

describe('create user actions', () => {
    afterEach(() => {
        mock.resetHandlers();
    });

    it('action creator', () => {
        expect(createAction(CREATE_PENDING)).toEqual({type: CREATE_PENDING});
        expect(createAction(CREATE_SUCCESS, 'success')).toEqual({type: CREATE_SUCCESS, msg: 'success'});
        expect(createAction(CREATE_FAILURE, 'failure')).toEqual({type: CREATE_FAILURE, msg: 'failure'});
    });

    it('async action creator - success case', () => {
        mock.onPost('/users').reply(200, {
            success: true,
            msg: 'success'
        });

        const expectedActions = [
            { type: CREATE_PENDING },
            { type: CREATE_SUCCESS, msg: 'success' }
        ];
        const store = mockStore({ todos: [] });

        return store.dispatch(createUser({})).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('async action creator - failure case', () => {
        mock.onPost('/users').reply(500, {
            success: false,
            msg: 'error'
        });

        const expectedActions = [
            { type: CREATE_PENDING },
            { type: CREATE_FAILURE, msg: 'error' }
        ];
        const store = mockStore({ todos: [] });

        return store.dispatch(createUser({})).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
});