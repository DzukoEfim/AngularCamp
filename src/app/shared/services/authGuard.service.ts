import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) {

    }

    canActivate() {
        if (!this.loginService.getToken() || this.loginService.getToken() === 'undefined') {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

}
