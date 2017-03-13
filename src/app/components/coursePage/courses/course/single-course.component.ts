import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ICourse }  from '../../../../interfaces/course-interfaces/course-interface';
@Component({
    selector: 'single-course',
    styleUrls: ['./single-course.component.css'],
    templateUrl: './single-course.component.html'
})

export class SingleCourseComponent implements OnInit, ICourse {
    @Output('onCourseDelete') onCourseDelete = new EventEmitter<number>();
    @Input('course') course: ICourse;
    public id: number;
    public title: string;
    public creatingDate: string;
    public duration: string;
    public description: string;

    ngOnInit() {
        this.id = this.course.id;
        this.title = this.course.title;
        this.creatingDate = this.course.creatingDate;
        this.duration = this.course.duration;
        this.description = this.course.description;
        console.log('single course INIT, course id - ', this.id);
    }

    public onEdit(): void {
        console.log('on sing-course EDIT click, course id - ', this.id);
    }

    public onDelete(): void {
        this.onCourseDelete.emit(this.id);
    }
}
