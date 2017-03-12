import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'courses',
    styleUrls: ['./courses.component.css'],
    templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit{
    @Input('courses') courses;

    public ngOnInit() {
        console.log('course OnInit, courses array - ', this.courses);
    }

    public onCourseDelete(id: number) {
        console.log('course was DELETED, course id - ', id);
    }
}
