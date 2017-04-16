import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges} from '@angular/core';
import { ICourse } from '../../../interfaces/course-interfaces/course-interface';
import { CoursesService } from '../../../services/courses.service';

@Component({
    selector: 'courses',
    styleUrls: ['./courses.component.css'],
    templateUrl: './courses.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursesComponent implements OnChanges{
    @Input('courses') courses: Array<ICourse>;
    @Input('totalCount') totalCount: number;

    @Output('onCourseDelete') onCourseDelete = new EventEmitter<number>();
    @Output('onCourseEdit') onCourseEdit = new EventEmitter<ICourse>();

    public showDeleteAlert: boolean = false;
    public courseInfo: {id: number, title: string};

    public coursesOnPage: number = 2;
    public currentStep: number = 1;

    constructor(
        private coursesService: CoursesService
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        console.log(this.courses);
        if (this.courses.length === 0 && this.currentStep !== 1) {
            this.navigateToStep(this.currentStep - 1);
        }
    }

    public navigateToStep(step: number): void {
        this.currentStep = step;
        this.coursesService.fetchCourses(step, this.coursesOnPage);

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
