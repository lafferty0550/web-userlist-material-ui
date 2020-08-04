import UserAPI, {UserModel} from '../../api/UserAPI';
import {ThunkType} from '../types';

export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

type Type = typeof FETCH_PENDING | typeof FETCH_SUCCESS | typeof FETCH_FAILURE;
type ActionType = { type: Type, data?: Array<UserModel>, msg?: string };
export {ActionType as UsersActionType};

export const createAction = (type: Type, data?: Array<UserModel>, msg?: string): ActionType => ({type, data, msg});

export default (): ThunkType<ActionType> => async dispatch => {
    dispatch(createAction(FETCH_PENDING));
    try {
        const result = await UserAPI.getUsers();
        if (!result.success)
            dispatch(createAction(FETCH_FAILURE, undefined, result.msg));
        else
            dispatch(createAction(FETCH_SUCCESS, result.users))
    } catch (err) {
        dispatch(createAction(FETCH_FAILURE, undefined, err.response.data.msg));
    }
}