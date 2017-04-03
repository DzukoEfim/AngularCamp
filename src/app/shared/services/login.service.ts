import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoaderService } from './loader.service';
import { IUserInfo } from '../../interfaces/common/login-interface';

@Injectable()
export class LoginService {
    public userInfo: Observable<IUserInfo>;
    private _userInfo: BehaviorSubject<IUserInfo>;

    constructor(private loaderService: LoaderService) {
        this.loaderService = loaderService;
        this._userInfo = <BehaviorSubject<IUserInfo>>new BehaviorSubject({loggedStatus: false});
        this.userInfo = this._userInfo.asObservable();
    }

    public login(userName: string, token: string): void {
        this.loaderService.enableLoader();
        setTimeout( () => {
            this._userInfo.next({userName: userName, token: token, loggedStatus: true});
            this.loaderService.disableLoader();
        }, Math.random() * 3000);

    }

    public logOut() {
        this.loaderService.enableLoader();
        setTimeout( () => {
            this._userInfo.next({loggedStatus: false});
            this.loaderService.disableLoader();
        }, Math.random() * 3000);

    }
}
