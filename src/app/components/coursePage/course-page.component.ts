import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ICourse } from '../../interfaces/course-interfaces/course-interface';
import { CoursesService } from '../../services/courses.service';
import { FilterCoursesPipe } from '../../pipes/filter-courses.pipe';

@Component({
    selector: 'course-page',
    styleUrls: ['./course-page.component.css'],
    templateUrl: './course-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursePageComponent {
    courses: Array<ICourse>;
    showCreateCourseForm: boolean = false;

    public filteredCourses: Array<ICourse>;

    constructor( private coursesService: CoursesService, private filterCoursesPipe: FilterCoursesPipe) {
        this.courses = this.coursesService.getCoursesList();
    }

    public onCourseSearch(valueObject: {value: string}) {
        this.courses = this.filterCoursesPipe.transform(this.coursesService.getCoursesList(), valueObject.value);
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
