import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Response } from '@angular/http';

import { AuthorizedHttpService } from './authorized-http.service';

@Injectable()
export class AuthorService {
    private _authorsObservable: BehaviorSubject<{authors: Array<string>, fetched: boolean}> =
        <BehaviorSubject<{authors: Array<string>, fetched: boolean}>> new BehaviorSubject({authors: [], fetched: false});
    private authorsObservable: Observable<{authors: Array<string>, fetched: boolean}> = this._authorsObservable.asObservable();

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

    public getAuthorsList(): Observable<{authors: Array<string>, fetched: boolean}> {
        this.fetchAuthors();
        return this.authorsObservable;
    }

    private getAythorsUrl(): string {
        return `http://localhost:3000/authors`;
    }
}
