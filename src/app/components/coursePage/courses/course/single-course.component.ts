import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ICourse }  from '../../../../interfaces/course-interfaces/course-interface';
@Component({
    selector: 'single-course',
    styleUrls: ['./single-course.component.css'],
    templateUrl: './single-course.component.html'
})

export class SingleCourse implements OnInit, ICourse{
    @Output('onCourseDelete') onCourseDelete = new EventEmitter<number>()
    @Input('course') singleCourse: ICourse;
    public id: number;
    public title: string;
    public creatingDate: string;
    public duration: string;
    public description: string;

    ngOnInit() {
        this.id = this.singleCourse.id;
        this.title= this.singleCourse.title;
        this.creatingDate = this.singleCourse.creatingDate;
        this.duration = this.singleCourse.duration;
        this.description = this.singleCourse.description;
        console.log('single course INIT, course id - ', this.id);
    }

    public onEdit() {
        console.log('on sing-course EDIT click, course id - ', this.singleCourse.id);
    }

    public onDelete() {
        this.onCourseDelete.emit(this.id);
        console.log('on sing-course DELETE click, course id - ', this.singleCourse.id);
    }
}
