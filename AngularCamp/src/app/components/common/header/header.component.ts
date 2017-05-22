import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../../../shared/services/login.service';
import { Router } from '@angular/router';
import { AuthActions } from '../../../actions/authActions';

@Component({
    selector: 'page-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppHeaderComponent implements OnInit {

    public userInfo: Object;

    constructor(
        private loginService: LoginService,
        private authActions: AuthActions,
        private changeDetector: ChangeDetectorRef,
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.authActions.getUserInfo().subscribe(
            store => {
                this.userInfo = store;
                this.changeDetector.markForCheck();
            }
        );
    }

    public logOutUser(): void {
        this.loginService.logOut(this.navigateToLogin.bind(this));
    }

    public navigateToLogin() {
        this.router.navigate(['/login']);
    }

}
