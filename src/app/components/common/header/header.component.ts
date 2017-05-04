import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../../../shared/services/login.service';
import { Router } from '@angular/router';
@Component({
    selector: 'page-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppHeaderComponent implements OnInit, OnDestroy {

    public userInfo: Object;
    public sub: any;

    constructor(
        private loginService: LoginService,
        private changeDetector: ChangeDetectorRef,
        private router: Router
    ) {

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
        this.router.navigate(['/login']);
    }

}
