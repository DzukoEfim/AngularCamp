import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';

import { IUserInfo } from '../../interfaces/common/login-interface';

@Component({
    selector: 'login-form',
    styleUrls: ['./login-form.component.css'],
    templateUrl: './login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginFormComponent {
    @Input('userInfo') userInfo: IUserInfo;
    public userName: string = '';
    public password: string = '';
    public formValid: boolean = true;

    constructor(
        private loginService: LoginService
    ) {
    }

    public logInUser (): void {
        this.loginService.login(this.userName, this.password);
    };

    public onEnter(): void {
        if (this.userName.length === 0 || this.password.length === 0) {
            this.formValid = false;
            return;
        }
        this.logInUser();
    }

}
