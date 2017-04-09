import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';

@Component({
    selector: 'login-form',
    styleUrls: ['./login-form.component.css'],
    templateUrl: './login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginFormComponent {
    public userName: string = '';
    public password: string = '';
    public formValid: boolean = true;

    constructor(private loginService: LoginService) {
        this.loginService = loginService;
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
