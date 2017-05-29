"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var LoginService = (function () {
    // public userInfo: Observable<IUserInfo>;
    // private _userInfo: BehaviorSubject<IUserInfo>;
    function LoginService(loaderService, http, authActions) {
        // this._userInfo = <BehaviorSubject<IUserInfo>>new BehaviorSubject({loggedStatus: false});
        // this.userInfo = this._userInfo.asObservable();
        this.loaderService = loaderService;
        this.http = http;
        this.authActions = authActions;
        if (this.getToken()) {
            this.hiddenLogin();
        }
    }
    LoginService.prototype.hiddenLogin = function () {
        var _this = this;
        this.http.post(this.getHiddenLoginUrl(), { token: this.getToken() })
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res.fail) {
                _this.authActions.errorLogin();
            }
            else {
                _this.authActions.login({ loggedStatus: true, userName: res.name });
            }
        });
    };
    LoginService.prototype.login = function (userName, password, success) {
        var _this = this;
        if (success === void 0) { success = function () { }; }
        return this.http.post(this.getLoginUrl(), { name: userName, password: password })
            .do(function () { _this.loaderService.enableLoader(); })
            .map(function (res) { return res.json(); })
            .do(function () { _this.loaderService.disableLoader(); })
            .subscribe(function (res) {
            if (res.fail) {
                _this.authActions.errorLogin();
            }
            else {
                localStorage.setItem('token', res.token);
                _this.authActions.login({ loggedStatus: true, userName: res.name });
                // this._userInfo.next({loggedStatus: true, userName: res.name});
                success();
                _this.getUserInfo();
            }
        });
    };
    LoginService.prototype.logOut = function (successLogout) {
        var _this = this;
        if (successLogout === void 0) { successLogout = function () { }; }
        this.http.get(this.getLogoutUrl())
            .do(function () { _this.loaderService.enableLoader(); })
            .map(function (res) { return res.json(); })
            .do(function () { _this.loaderService.disableLoader(); })
            .subscribe(function () {
            localStorage.setItem('token', void 0);
            _this.authActions.logout();
            // this._userInfo.next({loggedStatus: false});
            successLogout();
        });
    };
    LoginService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    LoginService.prototype.getUserInfo = function () {
        this.http.get(this.getUsersUrl() + '/1')
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res.success) {
                console.log('here is usage if methid GetUserInfo, info for user with id 1 - ', res);
            }
        });
    };
    LoginService.prototype.getUsersUrl = function () {
        return 'http://localhost:3000/users';
    };
    LoginService.prototype.getLoginUrl = function () {
        return 'http://localhost:3000/login';
    };
    LoginService.prototype.getLogoutUrl = function () {
        return 'http://localhost:3000/logout';
    };
    LoginService.prototype.getHiddenLoginUrl = function () {
        return 'http://localhost:3000/hiddenLogin';
    };
    LoginService = __decorate([
        core_1.Injectable()
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
