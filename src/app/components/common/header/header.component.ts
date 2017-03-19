import { Component } from '@angular/core';
import { IBreadcrumb }  from '../../../interfaces/course-interfaces/breacrumbs-interface';
import { LoginService } from '../../../shared/services/login.service';

@Component({
    selector: 'page-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})

export class AppHeaderComponent {
    public breadcrumbs: IBreadcrumb[];
    public userName: string;
    public isUserLogged: boolean;

    constructor(private loginService: LoginService) {

        loginService.subscribeToLogin(this.onUserStatusChanged, this);
        loginService.subscribeToLogout(this.onUserStatusChanged, this);

        this.loginService = loginService;
        this.userName = loginService.getUserName();
        this.isUserLogged = loginService.isUserLogged();
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

    onBreadcrumbClick = function (name: string): void {
        console.log(name);
    };

    public onUserStatusChanged(): void {
        this.userName = this.loginService.getUserName();
        this.isUserLogged = this.loginService.isUserLogged();
    }

    public logOutUser(): void {
        this.loginService.logOut();
    }

}
