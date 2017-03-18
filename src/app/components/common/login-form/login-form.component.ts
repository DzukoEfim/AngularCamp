import { Component } from '@angular/core';
import { LoginService } from '../../../shared/services/login.service'

@Component({
    selector: 'login-form',
    styleUrls: ['./login-form.component.css'],
    templateUrl: './login-form.component.html'
})

export class LoginFormComponent {
    public userName: string;
    public password: string;

    constructor(private loginService: LoginService) {
        this.loginService = loginService;
    }

    public logInUser () {
        this.loginService.login(this.userName, this.password);
    };

}
