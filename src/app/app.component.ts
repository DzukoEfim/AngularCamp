import { Component, NgZone, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoginService } from './shared/services/login.service';
import { LoaderService } from './shared/services/loader.service';
import { IUserInfo } from './interfaces/common/login-interface';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    public title: string;
    public userInfo: IUserInfo;
    public showLoader: boolean = false;

    constructor(private loginservice: LoginService, private _ngZone: NgZone, private loaderService: LoaderService) {
        this._ngZone = _ngZone;
        this.loaderService = loaderService;
    }

    ngOnInit() {
        this._ngZone.onUnstable.subscribe( () => {
            console.time('test');
        });
        this._ngZone.onStable.subscribe( () => {
            console.timeEnd('test');
        });
        this.loginservice.userInfo.subscribe( (userInfo) => {
            this.userInfo = userInfo;
        });
        this.loaderService.showLoader.subscribe( (value) => {
            this.showLoader = value;
        });
    }
}
