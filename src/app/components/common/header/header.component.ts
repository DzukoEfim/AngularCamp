import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { IBreadcrumb }  from '../../../interfaces/course-interfaces/breacrumbs-interface';
import { LoginService } from '../../../shared/services/login.service';
import { Router } from '@angular/router';
@Component({
    selector: 'page-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppHeaderComponent implements OnInit, OnDestroy {
    public breadcrumbs: IBreadcrumb[];
    public userInfo: Object;
    public sub: any;

    constructor(
        private loginService: LoginService,
        private changeDetector: ChangeDetectorRef,
        private router: Router
    ) {
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
        this.sub = this.loginService.userInfo.subscribe( (userInfo) => {
            this.userInfo = userInfo;
            this.changeDetector.markForCheck();
        });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onBreadcrumbClick = function (name: string): void {
        console.log(name);
    };

    public logOutUser(): void {
        this.loginService.logOut(this.navigateToLogin.bind(this));
    }

    public navigateToLogin() {
        this.router.navigate(['/login'])
    }

}
