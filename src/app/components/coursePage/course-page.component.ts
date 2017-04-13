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
    courses: Array<ICourse> = [];
    showCreateCourseForm: boolean = false;

    private sub: any;

    public filteredCourses: Array<ICourse>;

    constructor( private coursesService: CoursesService,
                 private timeService: TimeService,
                 private _changeDetectionRed: ChangeDetectorRef
    ) {
        this.timeService = timeService;
    }

    ngOnInit() {
        /*
        *
        * single courses stream
        *
        * */
        // this.coursesService.getCoursesList()
        //     .map( course => course )
        //     .filter( singleCourse => {
        //         let courseDateCreate = new Date(singleCourse.date),
        //             currentDate = new Date();
        //
        //         return singleCourse.duration === 0 ?
        //                  true :
        //                  this.timeService.getDaysInDate(courseDateCreate) > (this.timeService.getDaysInDate(currentDate) - 14);
        //     })
        //     .subscribe(
        //         (course) => {
        //             console.log(course);
        //             if (course.duration === 0) {
        //                 this.courses = [];
        //                 this._changeDetectionRed.markForCheck();
        //             } else {
        //                 this.courses.push(course);
        //                 this._changeDetectionRed.markForCheck();
        //             }
        //         },
        //         error => {
        //             console.log(error);
        //         },
        //
        //         () => {
        //             console.log('completed!');
        //         }
        //     );
        this.sub = this.coursesService.getCoursesList()
            .map( course => course )
            .subscribe(
                (courses) => {
                    this.courses = courses.filter( singleCourse => {
                        let courseDateCreate = new Date(singleCourse.date),
                            currentDate = new Date();

                        return this.timeService.getDaysInDate(courseDateCreate) > (this.timeService.getDaysInDate(currentDate) - 14);
                    });
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

    public onCourseSearch(valueObject: {value: string}): void {
        this.coursesService.filterCourses(valueObject.value);
    }

    public onAddNewClick(): void {
        this.showCreateCourseForm = true;
    }

    public onCreateFormClose(): void {
        this.showCreateCourseForm = false;
    }

    public onAddNewCourse(courseObject: ICourse): void {
        this.coursesService.createCourse(courseObject);
        this.onCreateFormClose();
    }

    public onCourseDelete(id: number): void {
        this.coursesService.deleteCourse(id);
    }

    public onCourseEdit(editCourseObject: ICourse): void {
        this.coursesService.updateCourse(editCourseObject);
    }


}
