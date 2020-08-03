import UserAPI, {UserModel} from '../../api/UserAPI';
import {ThunkType} from '../types';

export const CREATE_PENDING = 'CREATE_PENDING';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';

type Type = typeof CREATE_PENDING | typeof CREATE_SUCCESS | typeof CREATE_FAILURE;
type ActionType = { type: Type, msg?: string };
export {ActionType as CreateActionType};

const createAction = (type: Type, msg?: string): ActionType => ({type, msg});

export default (user: UserModel): ThunkType<ActionType> => async dispatch => {
    dispatch(createAction(CREATE_PENDING));

    try {
        const result = await UserAPI.createUser(user);
        if (!result.success)
            dispatch(createAction(CREATE_FAILURE, result.msg));
        else
            dispatch(createAction(CREATE_SUCCESS, result.msg));
    } catch (err) {
        console.error(err.toString());
        dispatch(createAction(CREATE_FAILURE, err.response.data.msg));
    }
}