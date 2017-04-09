import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ICourse } from '../../interfaces/course-interfaces/course-interface';
import { CoursesService } from '../../services/courses.service';
import { TimeService } from '../../shared/services/time.service';

@Component({
    selector: 'course-page',
    styleUrls: ['./course-page.component.css'],
    templateUrl: './course-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursePageComponent implements OnInit {
    courses: Array<ICourse> = [];
    showCreateCourseForm: boolean = false;

    public filteredCourses: Array<ICourse>;

    constructor( private coursesService: CoursesService,
                 private timeService: TimeService
    ) {
        this.timeService = timeService;
    }

    ngOnInit() {
        this.coursesService.getCoursesList()
            .subscribe( (courses) => {
                this.courses = courses.filter( singleCourse => {
                    let courseDateCreate = new Date(singleCourse.date),
                        currentDate = new Date();
                    return this.timeService.getDaysInDate(courseDateCreate) > this.timeService.getDaysInDate(currentDate) - 14;
                });
            });

    }

    public onCourseSearch(valueObject: {value: string}): void {
        this.coursesService.filterCourses(valueObject.value);
        // this.courses = this.filterCoursesPipe.transform(this.courses, valueObject.value);
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
