import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { LoaderService } from '../../shared/services/loader.service';
import { IUserInfo } from '../../interfaces/common/login-interface';
import { Router } from '@angular/router';

@Component({
    selector: 'login-form',
    styleUrls: ['./login-form.component.css'],
    templateUrl: './login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginFormComponent implements OnInit, OnDestroy {
    private subLoader: any;
    public showLoader: boolean = false;
    public userInfo: IUserInfo;
    public formModel: any;

    constructor(
        private loginService: LoginService,
        private loaderService: LoaderService,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.subLoader = this.loaderService.showLoader.subscribe( (value) => {
            this.showLoader = value;
        });
        this.formModel = {username: '', password: ''};
    }

    ngOnDestroy() {
        this.subLoader.unsubscribe();
    }

    public submit (form: any): void {
        this.loginService.login(form.value.username, form.value.password, this.successNavigate.bind(this));
    }

    public successNavigate () {
        this.router.navigate(['/courses']);
    }

}
