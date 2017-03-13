import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from '../../../interfaces/course-interfaces/course-interface';

@Component({
    selector: 'courses',
    styleUrls: ['./courses.component.css'],
    templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit {
    @Input('courses') courses: Array<ICourse>;

    public ngOnInit() {
        console.log('course OnInit, courses array - ', this.courses);
    }

    public onCourseDelete(id: number): void {
        console.log('course was DELETED, course id - ', id);
    }
}
