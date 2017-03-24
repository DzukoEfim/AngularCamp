import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICourseCreate } from '../../../interfaces/course-interfaces/course-interface';

@Component({
    selector: 'course-create-form',
    styleUrls: ['course-create-form.component.css'],
    templateUrl: 'course-create-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseCreateFormComponent {
    @Output('onCreateFormClose') onCreateFormClose = new EventEmitter<void>();
    @Output('onAddNewCourse') onAddNewCourse = new EventEmitter<Object>();

    public title: string = '';
    public duration: string = '';
    public description: string = '';

    public onFormClose(): void {
        this.onCreateFormClose.emit();
    }

    public clearFormData(): void {
        this.title = '';
        this.duration = '';
        this.description = '';
    }

    public onCourseCreate(): void {
        let courseObject: ICourseCreate = {
            title: this.title,
            duration: this.duration,
            description: this.description
        };
        this.clearFormData();
        this.onAddNewCourse.emit(courseObject);
    }
}
