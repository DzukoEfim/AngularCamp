"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SingleCourseComponent = (function () {
    function SingleCourseComponent() {
        this.onCourseDelete = new core_1.EventEmitter();
        this.onCourseEdit = new core_1.EventEmitter();
        this.editMode = false;
    }
    SingleCourseComponent.prototype.ngOnInit = function () {
        this.editTitle = this.course.title;
        this.editDuration = this.course.duration;
        this.editDescription = this.course.description;
    };
    SingleCourseComponent.prototype.switchEditMode = function () {
        this.editMode = !this.editMode;
    };
    SingleCourseComponent.prototype.onEdit = function () {
        this.onCourseEdit.emit({
            id: this.course.id,
            title: this.editTitle,
            duration: this.editDuration,
            description: this.editDescription
        });
        this.switchEditMode();
    };
    SingleCourseComponent.prototype.onDelete = function () {
        this.onCourseDelete.emit({
            id: this.course.id,
            title: this.course.title
        });
    };
    __decorate([
        core_1.Output('onCourseDelete')
    ], SingleCourseComponent.prototype, "onCourseDelete", void 0);
    __decorate([
        core_1.Output('onCourseEdit')
    ], SingleCourseComponent.prototype, "onCourseEdit", void 0);
    __decorate([
        core_1.Input('course')
    ], SingleCourseComponent.prototype, "course", void 0);
    SingleCourseComponent = __decorate([
        core_1.Component({
            selector: 'single-course',
            styleUrls: ['./single-course.component.css'],
            templateUrl: './single-course.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], SingleCourseComponent);
    return SingleCourseComponent;
}());
exports.SingleCourseComponent = SingleCourseComponent;
