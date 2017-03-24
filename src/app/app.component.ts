import { Component, NgZone, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { LoginService } from './shared/services/login.service';
// import {Observable} from "rxjs";

@Component({
    selector: 'my-app', // <my-app></my-app>
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
    public title: string;
    public userInfo: Object;
    public label: string;
    public progress: number = 0;
    // public userInfo: Observable<Object>;

    constructor(private loginservice: LoginService, private _ngZone: NgZone, private ref: ChangeDetectorRef) {
        // this.isUserLogged = loginservice.isUserLogged();
        // loginservice.subscribeToLogin(this.loginUser.bind(this));
        // loginservice.subscribeToLogout(this.logOutuser, this);

        this._increaseProgress(() => console.log('Inside Done!'));
    }

    ngOnInit() {
        this.loginservice.userInfo.subscribe( (value) => {
            this.userInfo = value;
        });
    }

    // private loginUser(): void {
    //     this.isUserLogged = true;
    // }
    //
    // private logOutuser(): void {
    //     this.isUserLogged = false;
    // }

    processOutsideOfAngularZone() {
        this.label = 'outside';
        this.progress = 0;
        this._ngZone.runOutsideAngular(() => {
            this._increaseProgress(() => {
                this._ngZone.run(() => {console.log('Outside Done!') });
            })});
    }

    _increaseProgress(doneCallback: () => void) {
        this.progress += 1;
        console.log(`Current progress: ${this.progress}%`);
        if (this.progress < 100) {
            window.setTimeout(() => this._increaseProgress(doneCallback), 10)
        } else {
            doneCallback();
        }
    }
}
