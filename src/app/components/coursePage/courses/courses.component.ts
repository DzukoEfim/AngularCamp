import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, OnInit, /*OnDestroy*/ } from '@angular/core';
import { ICourse } from '../../../interfaces/course-interfaces/course-interface';
import { CoursesService } from '../../../services/courses.service';
import { CoursesActions } from '../../../actions/coursesActions';

@Component({
    selector: 'courses',
    styleUrls: ['./courses.component.css'],
    templateUrl: './courses.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursesComponent implements OnChanges, OnInit /*OnDestroy*/ {
    public courses: Array<ICourse> = [];
    public totalCount: number = 0;

    public showDeleteAlert: boolean = false;
    public courseInfo: {id: number, title: string};

    public coursesOnPage: number = 2;
    public currentStep: number = 1;

    constructor(
        private coursesService: CoursesService,
        private _changeDetectionRef: ChangeDetectorRef,
        private coursesActions: CoursesActions
    ) {
    }

    ngOnChanges() {
        if (this.courses.length === 0 && this.currentStep !== 1) {
            this.navigateToStep(this.currentStep - 1);
        }
    }

    ngOnInit() {
        this.coursesActions.getCourses()
            .subscribe(
                (courses: any) => {
                    const newCoursesArray = [];

                    for (let i = (courses.currentStep - 1) * courses.coursesOnPage; i < courses.currentStep * courses.coursesOnPage; i++) {
                        if (i >= courses.coursesList.length) {
                            break;
                        }
                        newCoursesArray.push(courses.coursesList[i]);
                    }

                    this.courses = newCoursesArray;
                    this.totalCount = courses.coursesList.length;
                    this._changeDetectionRef.markForCheck();
                }
            );
    }

    public navigateToStep(step: number): void {
        this.currentStep = step;
        this.coursesActions.navigateToCoursesPage(step);

    }

    public deleteCourse(id: number): void {
        this.coursesService.deleteCourse(id);
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
}
