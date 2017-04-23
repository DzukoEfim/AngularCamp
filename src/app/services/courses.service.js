"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var rxjs_1 = require('rxjs');
var CoursesService = (function () {
    function CoursesService(http) {
        this.http = http;
        this._coursesObservable = new rxjs_1.BehaviorSubject({ newCourses: [], totalCount: 0 });
        this.coursesObservable = this._coursesObservable.asObservable();
        this.courseSearchText = '';
        this.currentStep = 1;
        this.coursesOnPage = 2;
        this.createCourseURL = 'http://localhost:3000/courses';
    }
    CoursesService.prototype.fetchCourses = function () {
        var _this = this;
        this.http.get(this.getCoursesUrl())
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this._coursesObservable.next(res);
        });
    };
    CoursesService.prototype.deleteCourse = function (courseId) {
        var _this = this;
        this.http.deleteModel(this.getIdSpecificCoursesUrl(courseId))
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res.success) {
                _this.fetchCourses();
            }
        });
    };
    CoursesService.prototype.getCoursesList = function () {
        this.fetchCourses();
        return this.coursesObservable;
    };
    CoursesService.prototype.createCourse = function (courseObject) {
        var _this = this;
        var newCourse = {
            title: courseObject.title,
            duration: courseObject.duration,
            description: courseObject.description,
            date: new Date()
        };
        this.http.post(this.createCourseURL, newCourse)
            .map(function (res) { return res.json; })
            .subscribe(function () {
            _this.fetchCourses();
        });
    };
    CoursesService.prototype.updateCourse = function (courseObject) {
        var _this = this;
        this.http.put(this.getIdSpecificCoursesUrl(courseObject.id), courseObject)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res.success) {
                _this.fetchCourses();
            }
        });
    };
    CoursesService.prototype.getCurrentStep = function () {
        return this.currentStep;
    };
    CoursesService.prototype.getCoursesOnPage = function () {
        return this.coursesOnPage;
    };
    CoursesService.prototype.updateCourseSearchText = function (searchText) {
        this.courseSearchText = searchText;
    };
    CoursesService.prototype.setCurrentStep = function (step) {
        this.currentStep = step;
    };
    CoursesService.prototype.setCoursesOnPage = function (coursesOnPage) {
        this.coursesOnPage = coursesOnPage;
    };
    CoursesService.prototype.getCoursesUrl = function () {
        return "http://localhost:3000/courses?" +
            ("pageNumber=" + this.currentStep) +
            ("&coursesOnPage=" + this.coursesOnPage) +
            ("&searchText=" + this.courseSearchText);
    };
    CoursesService.prototype.getIdSpecificCoursesUrl = function (id) {
        return "http://localhost:3000/courses/" + id;
    };
    CoursesService = __decorate([
        core_1.Injectable()
    ], CoursesService);
    return CoursesService;
}());
exports.CoursesService = CoursesService;
