"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CourseConfirmationAlertComponent = (function () {
    function CourseConfirmationAlertComponent() {
        this.onClose = new core_1.EventEmitter();
        this.onSubmit = new core_1.EventEmitter();
    }
    CourseConfirmationAlertComponent.prototype.onCloseClick = function () {
        this.onClose.emit();
    };
    CourseConfirmationAlertComponent.prototype.onSubmitClick = function () {
        this.onSubmit.emit(this.courseInfo.id);
    };
    __decorate([
        core_1.Input('courseInfo')
    ], CourseConfirmationAlertComponent.prototype, "courseInfo", void 0);
    __decorate([
        core_1.Output('onClose')
    ], CourseConfirmationAlertComponent.prototype, "onClose", void 0);
    __decorate([
        core_1.Output('onSubmit')
    ], CourseConfirmationAlertComponent.prototype, "onSubmit", void 0);
    CourseConfirmationAlertComponent = __decorate([
        core_1.Component({
            selector: 'course-confirmation-alert',
            styleUrls: ['course-confirmation-alert.component.css'],
            templateUrl: 'course-confirmation-alert.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], CourseConfirmationAlertComponent);
    return CourseConfirmationAlertComponent;
}());
exports.CourseConfirmationAlertComponent = CourseConfirmationAlertComponent;
