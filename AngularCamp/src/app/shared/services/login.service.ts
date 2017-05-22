import { Injectable } from '@angular/core';
// import { Observable, BehaviorSubject } from 'rxjs';
import { Response, Http } from '@angular/http';

import { LoaderService } from './loader.service';
import { AuthActions } from '../../actions/authActions';

@Injectable()
export class LoginService {
    // public userInfo: Observable<IUserInfo>;
    // private _userInfo: BehaviorSubject<IUserInfo>;

    constructor(
        private loaderService: LoaderService,
        private http: Http,
        private authActions: AuthActions
    ) {
        // this._userInfo = <BehaviorSubject<IUserInfo>>new BehaviorSubject({loggedStatus: false});
        // this.userInfo = this._userInfo.asObservable();

        if (this.getToken()) {
            this.hiddenLogin();
        }
    }

    private hiddenLogin(): void {
        this.http.post(this.getHiddenLoginUrl(), {token: this.getToken()})
            .map( (res: Response) => { return res.json(); })
            .subscribe(
                res => {
                    if (res.fail) {
                        this.authActions.errorLogin();
                        // this._userInfo.next({loggedStatus: false});
                    } else {
                        this.authActions.login({loggedStatus: true, userName: res.name});
                        // this._userInfo.next({loggedStatus: true, userName: res.name});
                    }
                }
            );

    }

    public login(userName: string, password: string, success: Function = () => {}) {
        return this.http.post(this.getLoginUrl(), {name: userName, password: password})
            .do(() => { this.loaderService.enableLoader(); })
            .map( (res: Response) => { return res.json(); })
            .do(() => { this.loaderService.disableLoader(); })
            .subscribe(
                res => {
                    if (res.fail) {
                        this.authActions.errorLogin();
                        // this._userInfo.next({loggedStatus: false});
                    } else {
                        localStorage.setItem('token', res.token);
                        this.authActions.login({loggedStatus: true, userName: res.name});
                        // this._userInfo.next({loggedStatus: true, userName: res.name});
                        success();
                        this.getUserInfo();
                    }
                }
            );
    }

    public logOut(successLogout: Function = () => {}) {
        this.http.get(this.getLogoutUrl())
            .do(() => { this.loaderService.enableLoader(); })
            .map( (res: Response) => { return res.json(); })
            .do(() => { this.loaderService.disableLoader(); })
            .subscribe(
                () => {
                    localStorage.setItem('token', void 0);
                    this.authActions.logout();
                    // this._userInfo.next({loggedStatus: false});
                    successLogout();
                }
            );
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public getUserInfo() {
        this.http.get(this.getUsersUrl() + '/1')
            .map( (res: Response) => { return res.json(); } )
            .subscribe(
                res => {
                    if (res.success) {
                        console.log('here is usage if methid GetUserInfo, info for user with id 1 - ', res);
                    }
                }
            );
    }

    private getUsersUrl(): string {
        return 'http://localhost:3000/users';
    }

    private getLoginUrl(): string {
        return 'http://localhost:3000/login';
    }

    private getLogoutUrl(): string {
        return 'http://localhost:3000/logout';
    }

    private getHiddenLoginUrl(): string {
        return 'http://localhost:3000/hiddenLogin';
    }
}
