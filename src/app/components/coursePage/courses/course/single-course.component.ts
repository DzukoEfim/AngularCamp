import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ICourse, ICourseInfoForDelete, ICourseInfoForEdit }  from '../../../../interfaces/course-interfaces/course-interface';
@Component({
    selector: 'single-course',
    styleUrls: ['./single-course.component.css'],
    templateUrl: './single-course.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SingleCourseComponent implements OnInit {
    @Output('onCourseDelete') onCourseDelete = new EventEmitter<ICourseInfoForDelete>();
    @Output('onCourseEdit') onCourseEdit = new EventEmitter<ICourseInfoForEdit>();
    @Input('course') course: ICourse;
    public editMode: boolean = false;

    public editTitle: string;
    public editDuration: string;
    public editDescription: string;

    ngOnInit() {
        this.editTitle = this.course.title;
        this.editDuration = this.course.duration;
        this.editDescription = this.course.description;
    }

    public switchEditMode(): void {
        this.editMode = !this.editMode;
    }

    public onEdit(): void {
        this.onCourseEdit.emit({
            id: this.course.id,
            title: this.editTitle,
            duration: this.editDuration,
            description: this.editDescription
        });
        this.switchEditMode();
    }

    public onDelete(): void {
        this.onCourseDelete.emit({
            id: this.course.id,
            title: this.course.title
        });
    }
}
