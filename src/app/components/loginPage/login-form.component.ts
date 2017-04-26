import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';

import { IUserInfo } from '../../interfaces/common/login-interface';

@Component({
    selector: 'login-form',
    styleUrls: ['./login-form.component.css'],
    templateUrl: './login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginFormComponent implements OnInit {
    @Input('userInfo') userInfo: IUserInfo;
    public formModel: any;
    constructor(
        private loginService: LoginService,

    ) {
    }

    ngOnInit() {
        this.formModel = {username: '', password: ''};
    }

    public submit (form: any): void {
        this.loginService.login(form.value.username, form.value.password);
    }

}
