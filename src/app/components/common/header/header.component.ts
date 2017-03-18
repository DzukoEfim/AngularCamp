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

    constructor(private loginService: LoginService) {
        this.loginService = loginService;
        this.userName = loginService.getUserName();

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

    public logOutUser(): void {
        this.loginService.logOut()
    }

}
