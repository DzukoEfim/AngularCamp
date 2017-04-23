"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CoursesComponent = (function () {
    function CoursesComponent(coursesService) {
        this.coursesService = coursesService;
        this.onCourseDelete = new core_1.EventEmitter();
        this.onCourseEdit = new core_1.EventEmitter();
        this.showDeleteAlert = false;
        this.coursesOnPage = 2;
        this.currentStep = 1;
    }
    CoursesComponent.prototype.ngOnChanges = function () {
        if (this.courses.length === 0 && this.currentStep !== 1) {
            this.navigateToStep(this.currentStep - 1);
        }
    };
    CoursesComponent.prototype.navigateToStep = function (step) {
        this.currentStep = step;
        this.coursesService.setCurrentStep(step);
        this.coursesService.fetchCourses();
    };
    CoursesComponent.prototype.deleteCourse = function (id) {
        this.onCourseDelete.emit(id);
        this.closeAlert();
    };
    CoursesComponent.prototype.closeAlert = function () {
        this.courseInfo = null;
        this.showDeleteAlert = false;
    };
    CoursesComponent.prototype.openAlert = function (courseInfo) {
        this.courseInfo = courseInfo;
        this.showDeleteAlert = true;
    };
    CoursesComponent.prototype.editCourse = function (courseEditObject) {
        this.onCourseEdit.emit(courseEditObject);
    };
    __decorate([
        core_1.Input('courses')
    ], CoursesComponent.prototype, "courses", void 0);
    __decorate([
        core_1.Input('totalCount')
    ], CoursesComponent.prototype, "totalCount", void 0);
    __decorate([
        core_1.Output('onCourseDelete')
    ], CoursesComponent.prototype, "onCourseDelete", void 0);
    __decorate([
        core_1.Output('onCourseEdit')
    ], CoursesComponent.prototype, "onCourseEdit", void 0);
    CoursesComponent = __decorate([
        core_1.Component({
            selector: 'courses',
            styleUrls: ['./courses.component.css'],
            templateUrl: './courses.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], CoursesComponent);
    return CoursesComponent;
}());
exports.CoursesComponent = CoursesComponent;
