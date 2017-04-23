"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DurationPipe = (function () {
    function DurationPipe() {
    }
    DurationPipe.prototype.transform = function (duration) {
        var hours = Math.floor((duration / 60) % 60), minutes = duration % 60, result = '';
        if (hours >= 1) {
            result += hours + 'h ';
        }
        if (minutes > 0) {
            result += minutes + 'min';
        }
        return result;
    };
    DurationPipe = __decorate([
        core_1.Pipe({
            name: 'duration'
        })
    ], DurationPipe);
    return DurationPipe;
}());
exports.DurationPipe = DurationPipe;
