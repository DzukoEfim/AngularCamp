"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var rxjs_1 = require('rxjs');
var LoginService = (function () {
    function LoginService(loaderService, http) {
        this.loaderService = loaderService;
        this.http = http;
        this._userInfo = new rxjs_1.BehaviorSubject({ loggedStatus: true, errorLogging: false });
        this.userInfo = this._userInfo.asObservable();
    }
    LoginService.prototype.login = function (userName, password) {
        var _this = this;
        return this.http.post(this.getLoginUrl(), { name: userName, password: password })
            .do(function () { _this.loaderService.enableLoader(); })
            .map(function (res) { return res.json(); })
            .do(function () { _this.loaderService.disableLoader(); })
            .subscribe(function (res) {
            if (res.fail) {
                _this._userInfo.next({ loggedStatus: false, errorLogging: true });
            }
            else {
                _this.userToken = res.token;
                _this._userInfo.next({ loggedStatus: true, errorLogging: false, userName: res.name });
                _this.getUserInfo();
            }
        });
    };
    LoginService.prototype.logOut = function () {
        var _this = this;
        this.http.get(this.getLogoutUrl())
            .do(function () { _this.loaderService.enableLoader(); })
            .map(function (res) { return res.json(); })
            .do(function () { _this.loaderService.disableLoader(); })
            .subscribe(function () {
            _this.userToken = void 0;
            _this._userInfo.next({ loggedStatus: false, errorLogging: false });
        });
    };
    LoginService.prototype.getToken = function () {
        return this.userToken;
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
    LoginService = __decorate([
        core_1.Injectable()
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
