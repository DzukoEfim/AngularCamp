import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

    public getUserName(): string {
        return localStorage.getItem('userName');
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public login(userName: string, token: string): void {
        localStorage.setItem('userName', JSON.stringify({
            userName: userName,
            token: token
        }));
    }

    public logOut() {
        localStorage.clear();
    }

    public isUserLogged(): boolean {
        return this.getUserName().length > 0 && this.getToken().length > 0;
    }
}
