import { Component } from '@angular/core';
import { LoginService } from './shared/services/login.service';

@Component({
    selector: 'my-app', // <my-app></my-app>
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title: string;
    isUserLogged: boolean;

    constructor(loginservice: LoginService) {
        this.isUserLogged = loginservice.isUserLogged();
    }
}
