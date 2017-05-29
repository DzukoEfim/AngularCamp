import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
    public showLoader: Observable<boolean>;
    private _showLoader: BehaviorSubject<boolean>;

    constructor() {
        this._showLoader = <BehaviorSubject<boolean>> new BehaviorSubject(false);
        this.showLoader = this._showLoader.asObservable();
    }

    public enableLoader(): void {
        this._showLoader.next(true);
    }

    public disableLoader(): void {
        this._showLoader.next(false);
    }
}
