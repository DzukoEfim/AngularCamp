"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var reduxConstants_1 = require('../constants/reduxConstants');
var CoursesActions = (function () {
    function CoursesActions(store) {
        this.store = store;
    }
    CoursesActions.prototype.courseListUpdated = function (payload) {
        this.store.dispatch({ type: reduxConstants_1.reduxConstants.COURSES_UPDATED, payload: payload });
    };
    CoursesActions.prototype.getCourses = function () {
        return this.store.select('courses');
    };
    CoursesActions.prototype.navigateToCoursesPage = function (step) {
        this.store.dispatch({ type: reduxConstants_1.reduxConstants.COURSES_NAVIGATE, payload: { currentStep: step } });
    };
    CoursesActions.prototype.deleteCourse = function (course) {
        this.store.dispatch({ type: reduxConstants_1.reduxConstants.COURSE_DELETED, payload: course });
    };
    CoursesActions.prototype.updateCurse = function (course) {
        this.store.dispatch({ type: reduxConstants_1.reduxConstants.COURSE_UPDATED, payload: course });
    };
    CoursesActions.prototype.createCourse = function (course) {
        this.store.dispatch({ type: reduxConstants_1.reduxConstants.COURSE_CREATED, payload: course });
    };
    CoursesActions = __decorate([
        core_1.Injectable()
    ], CoursesActions);
    return CoursesActions;
}());
exports.CoursesActions = CoursesActions;
