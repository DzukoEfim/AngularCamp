import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICourse } from '../../../interfaces/course-interfaces/course-interface';

@Component({
    selector: 'courses',
    styleUrls: ['./courses.component.css'],
    templateUrl: './courses.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursesComponent implements OnInit {
    @Input('courses') courses: Array<ICourse>;
    @Output('onCourseDelete') onCourseDelete = new EventEmitter<number>();
    @Output('onCourseEdit') onCourseEdit = new EventEmitter<ICourse>();
    public showDeleteAlert: boolean = false;
    public courseInfo: {id: number, title: string};

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

    public openAlert(courseInfo: {id: number, title: string}): void {
        this.courseInfo = courseInfo;
        this.showDeleteAlert = true;
    }

    public editCourse(courseEditObject: ICourse): void {
        this.onCourseEdit.emit(courseEditObject);
    }
}
