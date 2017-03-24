import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IBreadcrumb }  from '../../../interfaces/course-interfaces/breacrumbs-interface';
import { LoginService } from '../../../shared/services/login.service';

import { Observable } from 'rxjs'

@Component({
    selector: 'page-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppHeaderComponent implements OnInit{
    public breadcrumbs: IBreadcrumb[];
    public userInfo: Observable<Object>;
    // public userName: string;
    // public isUserLogged: boolean;

    constructor(private loginService: LoginService) {
        // loginService.subscribeToLogin(this.onUserStatusChanged, this);
        // loginService.subscribeToLogout(this.onUserStatusChanged, this);

        this.loginService = loginService;
        // this.userName = loginService.getUserName();
        // this.isUserLogged = loginService.isUserLogged();
        this.breadcrumbs = [
            {
                name: 'main',
                url: '#'
            },
            {
                name: 'courses',
                url: 'test 2'
            }
        ];
    }

    ngOnInit() {
        this.userInfo = this.loginService.userInfo;
    }

    onBreadcrumbClick = function (name: string): void {
        console.log(name);
    };

    // public onUserStatusChanged(): void {
    //     this.userName = this.loginService.getUserName();
    //     this.isUserLogged = this.loginService.isUserLogged();
    // }

    public logOutUser(): void {
        this.loginService.logOut();
    }

}
