import {Component} from '@angular/core';

@Component({
    selector: 'login-form',
    styleUrls: ['./login-form.component.css'],
    templateUrl: './login-form.component.html'
})

export class LoginFormComponent {
    public isUserLogged: boolean;
    public userName: string;
    public password: string;

    constructor() {
        this.isUserLogged = false;
        this.userName = '';
        this.password = '';
    }

    public logOutUser = function () {
        this.isUserLogged = false;
        this.userName = '';
        this.password = '';
    }

    public logInUser = function () {
        this.isUserLogged = true;
    }

}
