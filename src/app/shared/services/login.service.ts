import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Response, Http } from '@angular/http';

import { LoaderService } from './loader.service';
// import { AuthorizedHttpService } from './authorized-http.service';

import { IUserInfo } from '../../interfaces/common/login-interface';

@Injectable()
export class LoginService {
    public userInfo: Observable<IUserInfo>;
    private _userInfo: BehaviorSubject<IUserInfo>;
    private userToken: string;

    constructor(
        private loaderService: LoaderService,
        private http: Http
    ) {
        this._userInfo = <BehaviorSubject<IUserInfo>>new BehaviorSubject({loggedStatus: false, errorLogging: false});
        this.userInfo = this._userInfo.asObservable();
    }

    public login(userName: string, password: string) {
        return this.http.post(this.getUsersUrl(), {name: userName, password: password})
            .do(() => { this.loaderService.enableLoader(); })
            .map( (res: Response) => { return res.json(); })
            .do(() => { this.loaderService.disableLoader(); })
            .subscribe(
                res => {
                    if (res.fail) {
                        this._userInfo.next({loggedStatus: false, errorLogging: true});
                    } else {
                        this.userToken = res.token;
                        this._userInfo.next({loggedStatus: true, errorLogging: false, userName: res.name});
                    }
                }
            );
    }

    public logOut() {
        this.loaderService.enableLoader();
        setTimeout( () => {
            this.userToken = void 0;
            this._userInfo.next({loggedStatus: false, errorLogging: true});
            this.loaderService.disableLoader();
        }, Math.random() * 3000);

    }

    public getToken(): string {
        return this.userToken
    }

    private getUsersUrl(): string {
        return 'http://localhost:3000/users';
    }
}
