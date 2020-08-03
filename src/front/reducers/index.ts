import {combineReducers} from 'redux';

import {listReducer, creatingReducer} from './users';

const rootReducer = combineReducers({
    users: combineReducers({
        list: listReducer,
        create: creatingReducer
    })
});

type RootReducerType = typeof rootReducer;
export type AppStoreType = ReturnType<RootReducerType>;

export default rootReducer;