"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CoursePageComponent = (function () {
    function CoursePageComponent(coursesService, timeService, _changeDetectionRed) {
        this.coursesService = coursesService;
        this.timeService = timeService;
        this._changeDetectionRed = _changeDetectionRed;
        this.courses = [];
        this.showCreateCourseForm = false;
        this.totalCount = 0;
        this.timeService = timeService;
    }
    CoursePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.coursesService.getCoursesList()
            .map(function (course) { return course; })
            .subscribe(function (courses) {
            _this.courses = courses.newCourses.filter(function (singleCourse) {
                var courseDateCreate = new Date(singleCourse.date), currentDate = new Date();
                return _this.timeService.getDaysInDate(courseDateCreate) > (_this.timeService.getDaysInDate(currentDate) - 14);
            });
            _this.totalCount = courses.totalCount;
            _this._changeDetectionRed.markForCheck();
        }, function (error) {
            console.log(error);
        }, function () {
            console.log('completed!');
        });
    };
    CoursePageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    CoursePageComponent.prototype.onAddNewClick = function () {
        this.showCreateCourseForm = true;
    };
    CoursePageComponent.prototype.onCreateFormClose = function () {
        this.showCreateCourseForm = false;
    };
    CoursePageComponent.prototype.onAddNewCourse = function (courseObject) {
        this.coursesService.createCourse(courseObject);
        this.onCreateFormClose();
    };
    CoursePageComponent.prototype.onCourseDelete = function (id) {
        this.coursesService.deleteCourse(id);
    };
    CoursePageComponent.prototype.onCourseEdit = function (editCourseObject) {
        this.coursesService.updateCourse(editCourseObject);
    };
    CoursePageComponent = __decorate([
        core_1.Component({
            selector: 'course-page',
            styleUrls: ['./course-page.component.css'],
            templateUrl: './course-page.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], CoursePageComponent);
    return CoursePageComponent;
}());
exports.CoursePageComponent = CoursePageComponent;
