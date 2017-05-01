import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ICourse } from '../../interfaces/course-interfaces/course-interface';
import { CoursesService } from '../../services/courses.service';
import { TimeService } from '../../shared/services/time.service';

@Component({
    selector: 'course-page',
    styleUrls: ['./course-page.component.css'],
    templateUrl: './course-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursePageComponent implements OnInit, OnDestroy {
    public courses: Array<ICourse> = [];
    public authors: Array<string> = [];

    public totalCount: number = 0;

    private sub: any;

    constructor( private coursesService: CoursesService,
                 private timeService: TimeService,
                 private _changeDetectionRed: ChangeDetectorRef
    ) {
        this.timeService = timeService;
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
                    this._changeDetectionRed.markForCheck();
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

    public onCourseDelete(id: number): void {
        this.coursesService.deleteCourse(id);
    }


}
