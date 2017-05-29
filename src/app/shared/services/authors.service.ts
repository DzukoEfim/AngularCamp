import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Response } from '@angular/http';

import { AuthorizedHttpService } from './authorized-http.service';

@Injectable()
export class AuthorService {
    private _authorsObservable: BehaviorSubject<any> =
        <BehaviorSubject<any>> new BehaviorSubject(null);
    private authorsObservable: Observable<any> = this._authorsObservable.asObservable();

    constructor(
        private http: AuthorizedHttpService
    ) {

    }

    public fetchAuthors() {
        this.http.get(this.getAythorsUrl())
            .map( (res: Response) => { return res.json(); })
            .subscribe(
                res => {
                    this._authorsObservable.next({authors: res, fetched: true});
                }
            );
    }

    public getAuthorsList(): Observable<any> {
        this.fetchAuthors();
        return this.authorsObservable;
    }

    private getAythorsUrl(): string {
        return `http://localhost:3000/authors`;
    }
}
