"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var course_page_component_1 = require('./course-page.component');
var forms_1 = require('@angular/forms');
var course_control_panel_component_1 = require('./course-control-panel/course-control-panel.component');
var courses_component_1 = require('./courses/courses.component');
var courses_pagination_component_1 = require('./courses/courses-pagination/courses-pagination.component');
var single_course_component_1 = require('./courses/course/single-course.component');
var course_create_form_component_1 = require('./course-create-from/course-create-form.component');
var datefield_component_1 = require('./course-create-from/course-create-form-datefield/datefield-component');
var duration_component_1 = require('./course-create-from/course-create-form-durationfield/duration-component');
var course_confirmation_alert_component_1 = require('./course-confirmation-alert/course-confirmation-alert.component');
var course_border_directive_1 = require('../../directives/courses/course-border.directive');
var duration_pipe_1 = require('../../pipes/duration.pipe');
var sort_by_date_pipe_1 = require('../../pipes/sort-by-date.pipe');
var filter_courses_pipe_1 = require('../../pipes/filter-courses.pipe');
var courses_service_1 = require('../../services/courses.service');
var forDeclarations = [
    course_page_component_1.CoursePageComponent,
    courses_pagination_component_1.CoursesPaginationComponent,
    course_control_panel_component_1.CourseControlPanelComponent,
    courses_component_1.CoursesComponent,
    single_course_component_1.SingleCourseComponent,
    course_create_form_component_1.CourseCreateFormComponent,
    datefield_component_1.DateFieldComponent,
    duration_component_1.DurationComponent,
    course_confirmation_alert_component_1.CourseConfirmationAlertComponent,
    course_border_directive_1.CourseBorderDirective,
    duration_pipe_1.DurationPipe,
    sort_by_date_pipe_1.SortByDatePipe
];
var services = [
    courses_service_1.CoursesService,
    filter_courses_pipe_1.FilterCoursesPipe
];
var declarations = forDeclarations.slice();
var CoursePageModule = (function () {
    function CoursePageModule() {
    }
    CoursePageModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: declarations.slice(),
            exports: declarations.slice(),
            providers: services.slice()
        })
    ], CoursePageModule);
    return CoursePageModule;
}());
exports.CoursePageModule = CoursePageModule;
