import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
    FETCH_PENDING,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    createAction
} from './list';
import fetchUsers from './list';
import {instance} from '@api/UserAPI';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(instance);

describe('list user actions', () => {
    afterEach(() => {
        mock.resetHandlers();
    });

    it('action creator', () => {
        expect(createAction(FETCH_PENDING)).toEqual({type: FETCH_PENDING});
        expect(createAction(FETCH_SUCCESS, [1, 2, 3])).toEqual({type: FETCH_SUCCESS, data: [1, 2, 3]});
        expect(createAction(FETCH_FAILURE)).toEqual({type: FETCH_FAILURE});
    });

    it('async action creator - success case', () => {
        mock.onGet('/users').reply(200, {
            success: true,
            users: [1, 2, 3]
        });

        const expectedActions = [
            { type: FETCH_PENDING },
            { type: FETCH_SUCCESS, data: [1, 2, 3] }
        ];
        const store = mockStore({ todos: [] });

        return store.dispatch(fetchUsers()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('async action creator - failure case', () => {
        mock.onGet('/users').reply(500, {
            success: false,
            msg: 'error'
        });

        const expectedActions = [
            { type: FETCH_PENDING },
            { type: FETCH_FAILURE, msg: 'error' }
        ];
        const store = mockStore({ todos: [] });

        return store.dispatch(fetchUsers()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
})