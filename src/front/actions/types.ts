import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';

import {AppStoreType} from '@reducers';

export type ThunkType<ActionType extends Action> = ThunkAction<void, AppStoreType, unknown, ActionType>;