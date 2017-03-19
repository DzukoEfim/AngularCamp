import { Injectable } from '@angular/core';
import { IStoreCallback } from '../../interfaces/common/stores-interfaces';

@Injectable()
export class LoginService {
    private onLoginCallbacks: Array<IStoreCallback> = [];
    private onLogoutCallbacks: Array<IStoreCallback> = [];

    public subscribeToLogin(cb: Function, context?: Object): void  {
        this.onLoginCallbacks.push({
            cb: cb,
            context: context
        });
    }

    public subscribeToLogout(cb: Function, context?: Object): void {
        this.onLogoutCallbacks.push({
            cb: cb,
            context: context
        });
    }

    private notifyOnAction(callbacksArray: Array<IStoreCallback>): void {
        for (let cbObject of callbacksArray) {
            if (cbObject.context) {
                cbObject.cb.call(cbObject.context);
            }else {
                cbObject.cb();
            }
        }
    }

    public getUserName(): string {
        let userProfile = localStorage.getItem('userProfile');
        return userProfile ? JSON.parse(userProfile).userName : '';
    }

    public getToken(): string {
        let userProfile = localStorage.getItem('userProfile');
        return userProfile ? JSON.parse(userProfile).token : '';
    }

    public login(userName: string, token: string): void {
        localStorage.setItem('userProfile', JSON.stringify({
            userName: userName,
            token: token
        }));
        this.notifyOnAction(this.onLoginCallbacks);
    }

    public logOut() {
        localStorage.clear();
        this.notifyOnAction(this.onLogoutCallbacks);
    }

    public isUserLogged(): boolean {
        return this.getUserName() && this.getToken() &&
               this.getUserName().length > 0 && this.getToken().length > 0;
    }
}
