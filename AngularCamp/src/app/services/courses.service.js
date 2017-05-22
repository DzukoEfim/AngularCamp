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
    // private getAllCoursesURL: string = 'http://localhost:3000/coursesAll';
    function CoursesService(http, router, coursesActions) {
        this.http = http;
        this.router = router;
        this.coursesActions = coursesActions;
        // private _coursesObservable: BehaviorSubject<{newCourses: ICourse[], totalCount: number}> =
        //         <BehaviorSubject<{newCourses: ICourse[], totalCount: number}>> new BehaviorSubject({newCourses: [], totalCount: 0});
        // private coursesObservable: Observable<{newCourses: ICourse[], totalCount: number}> = this._coursesObservable.asObservable();
        this._singleCourseObservable = new rxjs_1.BehaviorSubject(null);
        this.singleCourseObservable = this._singleCourseObservable.asObservable();
        this.createCourseURL = 'http://localhost:3000/courses';
    }
    CoursesService.prototype.getTitleById = function (id) {
        var title = '';
        this.singleCourseObservable
            .map(function (course) { return course; })
            .subscribe(function (course) {
            if (course) {
                title = course.title;
            }
        });
        return title ? title : id;
    };
    CoursesService.prototype.deleteCourse = function (courseId) {
        var _this = this;
        this.http.deleteModel(this.getIdSpecificCoursesUrl(courseId))
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.coursesActions.deleteCourse(res);
        });
    };
    CoursesService.prototype.fetchSingleCourse = function (courseId) {
        var _this = this;
        this.http.get(this.getIdSpecificCoursesUrl(courseId))
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            if (res.fail) {
                _this.router.navigate(['**']);
            }
            else {
                _this._singleCourseObservable.next(res);
            }
        });
    };
    CoursesService.prototype.getSingleCourseById = function () {
        return this.singleCourseObservable;
    };
    CoursesService.prototype.updateCourse = function (courseObject, callback) {
        var _this = this;
        this.http.put(this.getIdSpecificCoursesUrl(courseObject.id), courseObject)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.coursesActions.updateCurse(res);
            callback();
        });
    };
    CoursesService.prototype.createCourse = function (courseObject, callback) {
        var _this = this;
        this.http.post(this.createCourseURL, courseObject)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.coursesActions.createCourse(res);
            callback();
        });
    };
    CoursesService.prototype.fetchCourses = function (searchText) {
        var _this = this;
        if (searchText === void 0) { searchText = ''; }
        this.http.get(this.getAllCoursesUrlWithSearchText(searchText))
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.coursesActions.courseListUpdated(res);
        });
    };
    CoursesService.prototype.getAllCoursesUrlWithSearchText = function (searchText) {
        if (searchText === void 0) { searchText = ''; }
        return "http://localhost:3000/coursesAll?" +
            ("&searchText=" + searchText);
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
