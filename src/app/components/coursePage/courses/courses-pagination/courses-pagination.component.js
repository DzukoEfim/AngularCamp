"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CoursesPaginationComponent = (function () {
    function CoursesPaginationComponent() {
        this.navigateToStep = new core_1.EventEmitter();
    }
    CoursesPaginationComponent.prototype.getNumberOfPageAsArray = function () {
        var numberOfPages = this.getNumberOfPages(), result = [];
        for (var i = 0; i < numberOfPages; i++) {
            result.push(i + 1);
        }
        return result;
    };
    CoursesPaginationComponent.prototype.getNumberOfPages = function () {
        return Math.ceil(this.totalCount / this.coursesOnPage);
    };
    CoursesPaginationComponent.prototype.onNavigationChange = function (value) {
        this.navigateToStep.emit(value);
    };
    CoursesPaginationComponent.prototype.onNavigateToPrevStep = function () {
        if (this.current !== 1) {
            this.navigateToStep.emit(this.current - 1);
        }
    };
    CoursesPaginationComponent.prototype.onNavigateToNextStep = function () {
        if (this.current !== this.getNumberOfPages()) {
            this.navigateToStep.emit(this.current + 1);
        }
    };
    __decorate([
        core_1.Input('totalCount')
    ], CoursesPaginationComponent.prototype, "totalCount", void 0);
    __decorate([
        core_1.Input('coursesOnPage')
    ], CoursesPaginationComponent.prototype, "coursesOnPage", void 0);
    __decorate([
        core_1.Input('current')
    ], CoursesPaginationComponent.prototype, "current", void 0);
    __decorate([
        core_1.Output('navigateToStep')
    ], CoursesPaginationComponent.prototype, "navigateToStep", void 0);
    CoursesPaginationComponent = __decorate([
        core_1.Component({
            selector: 'courses-pagination',
            styleUrls: ['courses-pagination.component.css'],
            templateUrl: 'courses-pagination.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], CoursesPaginationComponent);
    return CoursesPaginationComponent;
}());
exports.CoursesPaginationComponent = CoursesPaginationComponent;
