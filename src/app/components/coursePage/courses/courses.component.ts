import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICourse, ICourseInfoForDelete, ICourseInfoForEdit } from '../../../interfaces/course-interfaces/course-interface';

@Component({
    selector: 'courses',
    styleUrls: ['./courses.component.css'],
    templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit {
    @Input('courses') courses: Array<ICourse>;
    @Output('onCourseDelete') onCourseDelete = new EventEmitter<number>();
    @Output('onCourseEdit') onCourseEdit = new EventEmitter<ICourseInfoForEdit>();
    public showDeleteAlert: boolean = false;
    public courseInfo: ICourseInfoForDelete;

    public ngOnInit() {
        console.log('course OnInit, courses array - ', this.courses);
    }

    public deleteCourse(id: number): void {
        this.onCourseDelete.emit(id);
        this.closeAlert();
    }

    public closeAlert(): void {
        this.courseInfo = null;
        this.showDeleteAlert = false;
    }

    public openAlert(courseInfo: ICourseInfoForDelete): void {
        this.courseInfo = courseInfo;
        this.showDeleteAlert = true;
    }

    public editCourse(courseEditObject: ICourseInfoForEdit): void {
        this.onCourseEdit.emit(courseEditObject);
    }
}
