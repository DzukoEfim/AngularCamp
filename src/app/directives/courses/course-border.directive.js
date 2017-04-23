"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CourseBorderDirective = (function () {
    function CourseBorderDirective(el, timeService) {
        this.el = el;
        this.timeService = timeService;
    }
    CourseBorderDirective.prototype.ngOnInit = function () {
        var currentDate = new Date(), courseDateCreate = new Date(this.courseBorder), timeDiff = this.timeService.getDiffBetweenDatesInDays(courseDateCreate, currentDate);
        if (timeDiff > 0) {
            this.el.nativeElement.style.border = '2px solid #29B6F6';
        }
        if (timeDiff < 0 && this.timeService.getDaysInDate(courseDateCreate) >= this.timeService.getDaysInDate(currentDate) - 14) {
            this.el.nativeElement.style.border = '2px solid #66BB6A';
        }
    };
    __decorate([
        core_1.Input('courseBorder')
    ], CourseBorderDirective.prototype, "courseBorder", void 0);
    CourseBorderDirective = __decorate([
        core_1.Directive({
            selector: '[courseBorder]'
        })
    ], CourseBorderDirective);
    return CourseBorderDirective;
}());
exports.CourseBorderDirective = CourseBorderDirective;
