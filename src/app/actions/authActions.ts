import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUserInfo } from '../interfaces/common/login-interface';
import { reduxConstants } from '../constants/reduxConstants';

@Injectable()
export class AuthActions {

    constructor(
        private store: Store<any>
    ) {

    }

    public getUserInfo(): Observable<IUserInfo> {
        return this.store.select('userInfo');
    }

    public login(payload: IUserInfo): void {
        this.store.dispatch({type: reduxConstants.SUCCESS_LOGIN, payload: payload});
    }

    public logout(): void {
        this.store.dispatch({type: reduxConstants.SUCCESS_LOGOUT});
    }

    public errorLogin(): void {
        this.store.dispatch({type: reduxConstants.ERROR_LOGIN});
    }


}
