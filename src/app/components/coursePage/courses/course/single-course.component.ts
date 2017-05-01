import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ICourse }  from '../../../../interfaces/course-interfaces/course-interface';

@Component({
    selector: 'single-course',
    styleUrls: ['./single-course.component.css'],
    templateUrl: './single-course.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SingleCourseComponent {
    @Output('onCourseDelete') onCourseDelete = new EventEmitter<{id: number, title: string}>();
    @Input('course') course: ICourse;

    public onDelete(): void {
        this.onCourseDelete.emit({
            id: this.course.id,
            title: this.course.title
        });
    }
}
