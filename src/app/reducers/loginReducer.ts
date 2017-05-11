import { Action } from '@ngrx/store';
import { IUserInfo } from '../interfaces/common/login-interface';
import { reduxConstants } from '../constants/reduxConstants';

export function loginReducer(state: IUserInfo, action: Action) {
    switch (action.type) {
        case reduxConstants.SUCCESS_LOGIN:
            return Object.assign({}, state, action.payload);
        case reduxConstants.SUCCESS_LOGOUT:
        case reduxConstants.ERROR_LOGIN:
            return Object.assign({}, state, {loggedStatus: false});
        default:
            return state;
    }
}
