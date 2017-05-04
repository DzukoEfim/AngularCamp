import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { ICourse } from '../../../interfaces/course-interfaces/course-interface';
import { CoursesService } from '../../../services/courses.service';
import { TimeService } from '../../../shared/services/time.service';

@Component({
    selector: 'courses',
    styleUrls: ['./courses.component.css'],
    templateUrl: './courses.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursesComponent implements OnChanges, OnInit, OnDestroy {
    public courses: Array<ICourse> = [];
    public totalCount: number = 0;

    public showDeleteAlert: boolean = false;
    public courseInfo: {id: number, title: string};

    public coursesOnPage: number = 2;
    public currentStep: number = 1;

    private sub: any;

    constructor(
        private coursesService: CoursesService,
        private _changeDetectionRef: ChangeDetectorRef,
        private timeService: TimeService,
    ) {
    }

    ngOnChanges() {
        if (this.courses.length === 0 && this.currentStep !== 1) {
            this.navigateToStep(this.currentStep - 1);
        }
    }

    ngOnInit() {
        this.sub = this.coursesService.getCoursesList()
            .map( course => { return course; })
            .subscribe(
                (courses) => {
                    this.courses = courses.newCourses.filter( singleCourse => {
                        let courseDateCreate = new Date(singleCourse.date),
                            currentDate = new Date();

                        return this.timeService.getDaysInDate(courseDateCreate) > (this.timeService.getDaysInDate(currentDate) - 14);
                    });
                    this.totalCount = courses.totalCount;
                    this._changeDetectionRef.markForCheck();
                },
                error => {
                    console.log(error);
                },

                () => {
                    console.log('completed!');
                }
            );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public navigateToStep(step: number): void {
        this.currentStep = step;
        this.coursesService.setCurrentStep(step);
        this.coursesService.fetchCourses();

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
