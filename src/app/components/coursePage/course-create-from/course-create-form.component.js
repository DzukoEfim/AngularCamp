"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var CourseCreateFormComponent = (function () {
    function CourseCreateFormComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.onCreateFormClose = new core_1.EventEmitter();
        this.onAddNewCourse = new core_1.EventEmitter();
        this.title = '';
        this.duration = 0;
        this.description = '';
        this.dateField = '';
    }
    CourseCreateFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formGroup = this.formBuilder.group({
            title: ['', forms_1.Validators.maxLength(50)],
            description: ['', forms_1.Validators.maxLength(500)],
            dateField: '',
            duration: 0
        });
        this.formGroup.valueChanges.subscribe(function () {
            console.log(_this.formGroup);
            // console.log(this.formGroup.get('dateField').value)
        });
    };
    CourseCreateFormComponent.prototype.submit = function (formGroup) {
        console.log(formGroup);
    };
    CourseCreateFormComponent.prototype.onFormClose = function () {
        this.onCreateFormClose.emit();
    };
    CourseCreateFormComponent.prototype.clearFormData = function () {
        this.title = '';
        this.duration = 0;
        this.description = '';
    };
    CourseCreateFormComponent.prototype.onCourseCreate = function () {
        // let courseObject: ICourse = {
        //     title: this.title,
        //     duration: this.duration,
        //     description: this.description
        // };
        // this.clearFormData();
        // this.onAddNewCourse.emit(courseObject);
        console.log(this.formGroup);
    };
    __decorate([
        core_1.Output('onCreateFormClose')
    ], CourseCreateFormComponent.prototype, "onCreateFormClose", void 0);
    __decorate([
        core_1.Output('onAddNewCourse')
    ], CourseCreateFormComponent.prototype, "onAddNewCourse", void 0);
    CourseCreateFormComponent = __decorate([
        core_1.Component({
            selector: 'course-create-form',
            styleUrls: ['course-create-form.component.css'],
            templateUrl: 'course-create-form.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], CourseCreateFormComponent);
    return CourseCreateFormComponent;
}());
exports.CourseCreateFormComponent = CourseCreateFormComponent;
