"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var AuthorizedHttpService = (function () {
    function AuthorizedHttpService(http, loginService) {
        this.http = http;
        this.loginService = loginService;
    }
    AuthorizedHttpService.prototype.appendAuthHeader = function (headers) {
        headers.append('Authorization', 'Basic-Yafim-Test-Header' + btoa(this.loginService.getToken()));
    };
    AuthorizedHttpService.prototype.get = function (url) {
        var headers = new http_1.Headers();
        this.appendAuthHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    };
    AuthorizedHttpService.prototype.post = function (url, data) {
        var headers = new http_1.Headers();
        this.appendAuthHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    };
    AuthorizedHttpService.prototype.deleteModel = function (url) {
        var headers = new http_1.Headers();
        this.appendAuthHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });
    };
    AuthorizedHttpService.prototype.put = function (url, data) {
        var headers = new http_1.Headers();
        this.appendAuthHeader(headers);
        return this.http.put(url, data, {
            headers: headers
        });
    };
    AuthorizedHttpService = __decorate([
        core_1.Injectable()
    ], AuthorizedHttpService);
    return AuthorizedHttpService;
}());
exports.AuthorizedHttpService = AuthorizedHttpService;
