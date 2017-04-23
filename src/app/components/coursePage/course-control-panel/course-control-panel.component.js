"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CourseControlPanelComponent = (function () {
    function CourseControlPanelComponent(coursesService) {
        this.coursesService = coursesService;
        this.onAddNewClick = new core_1.EventEmitter();
        this.searchText = '';
    }
    CourseControlPanelComponent.prototype.searchCourse = function () {
        this.coursesService.updateCourseSearchText(this.searchText);
        this.coursesService.fetchCourses();
    };
    CourseControlPanelComponent.prototype.onCourseClear = function () {
        this.coursesService.updateCourseSearchText('');
        this.coursesService.fetchCourses();
    };
    CourseControlPanelComponent.prototype.onAddNew = function () {
        this.onAddNewClick.emit();
    };
    __decorate([
        core_1.Output('onAddNewClick')
    ], CourseControlPanelComponent.prototype, "onAddNewClick", void 0);
    CourseControlPanelComponent = __decorate([
        core_1.Component({
            selector: 'course-control-panel',
            styleUrls: ['./course-control-panel.component.css'],
            templateUrl: './course-control-panel.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], CourseControlPanelComponent);
    return CourseControlPanelComponent;
}());
exports.CourseControlPanelComponent = CourseControlPanelComponent;
