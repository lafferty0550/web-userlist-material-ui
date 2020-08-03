import {CREATE_PENDING, CREATE_SUCCESS, CREATE_FAILURE, CreateActionType} from '@actions/users/create';

const initialState = {
    pending: false,
    success: true,
    msg: ''
};

export type StateType = typeof initialState;

export default (state: StateType = initialState, action: CreateActionType) => {
    switch (action.type) {
        case CREATE_PENDING:
            return {
                ...state,
                pending: true
            }
        case CREATE_SUCCESS:
            return {
                pending: false,
                success: true,
                msg: action.msg
            }
        case CREATE_FAILURE:
            return {
                pending: false,
                success: false,
                msg: action.msg
            }
        default:
            return state
    }
}