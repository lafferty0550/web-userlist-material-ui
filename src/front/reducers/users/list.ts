import {FETCH_PENDING, FETCH_SUCCESS, FETCH_FAILURE, UsersActionType} from '@actions/users/list';
import {UserModel} from '@api/UserAPI';

const initialState = {
    pending: false,
    success: true,
    msg: '',
    data: [] as Array<UserModel>
};

export type StateType = typeof initialState;

export default (state: StateType = initialState, action: UsersActionType) => {
    switch (action.type) {
        case FETCH_PENDING:
            return {
                ...state,
                pending: true
            };
        case FETCH_SUCCESS:
            return {
                pending: false,
                success: true,
                msg: '',
                data: action.data
            };
        case FETCH_FAILURE:
            return {
                pending: false,
                success: false,
                msg: action.msg,
                data: []
            };
        default:
            return state
    }
};