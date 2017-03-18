import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { ICourse } from '../../../interfaces/course-interfaces/course-interface';

@Component({
    selector: 'courses',
    styleUrls: ['./courses.component.css'],
    templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit {
    @Input('courses') courses: Array<ICourse>;
    @Output('onCourseDelete') onCourseDelete = new EventEmitter<number>();
    public showDeleteAlert: boolean = false;
    public courseId: number;

    public ngOnInit() {
        console.log('course OnInit, courses array - ', this.courses);
    }

    public deleteCourse(id: number): void {
        this.onCourseDelete.emit(id);
    }

    public closeAlert(): void {
        this.courseId = null;
        this.showDeleteAlert = false;
    }

    public openAlert(id: number): void {
        this.courseId = id;
        this.showDeleteAlert = true;
    }
}
