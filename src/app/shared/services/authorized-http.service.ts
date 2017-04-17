import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizedHttpService {

    constructor(
        private http: Http,
        private loginService: LoginService
    ) { }

    private appendAuthHeader(headers: Headers) {
        headers.append('Authorization', 'Basic-Yafim-Test-Header' + btoa(this.loginService.getToken()));
    }

    public get(url: string): Observable<Response> {
        let headers = new Headers();
        this.appendAuthHeader(headers);

        return this.http.get(url, {
            headers: headers
        });
    }

    public post(url: string, data: Object): Observable<Response> {
        let headers = new Headers();
        this.appendAuthHeader(headers);

        return this.http.post(url, data, {
            headers: headers
        });
    }

    public deleteModel(url: string): Observable<Response> {
        let headers = new Headers();
        this.appendAuthHeader(headers);

        return this.http.delete(url, {
            headers: headers
        });
    }

    public put(url: string, data: Object): Observable<Response> {
        let headers = new Headers();
        this.appendAuthHeader(headers);

        return this.http.put(url, data, {
            headers: headers
        });
    }
}
