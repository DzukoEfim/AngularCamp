import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ICourse, ICourseCreate, ICourseInfoForEdit } from '../../interfaces/course-interfaces/course-interface';
import { CoursesService } from '../../services/courses.service';

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

    constructor( private coursesService: CoursesService ) {
        this.courses = coursesService.getCoursesList();
        this.coursesService = coursesService;
        // this.coursesService.subscribeToChanges(this.updateCourseList, this);
    }
    //
    // private updateCourseList(): void {
    //     this.courses = this.coursesService.getCoursesList();
    // }

    public onCourseSearch(valueObject: {value: string}): Array<ICourse> {
        let filteredArray: ICourse[] = [],
            searchText: string = valueObject.value;

        if (!searchText || searchText === '') {
            return filteredArray;
        }

        for (let course of this.courses) {
            if (course.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                filteredArray.push(course);
            }
        }

        return filteredArray;
    }

    public onAddNewClick(): void {
        this.showCreateCourseForm = true;
    }

    public onCreateFormClose(): void {
        this.showCreateCourseForm = false;
    }

    public onAddNewCourse(courseObject: ICourseCreate): void {
        this.coursesService.createCourse(courseObject);
        this.onCreateFormClose();
    }

    public onCourseDelete(id: number): void {
        this.coursesService.deleteCourse(id);
    }

    public onCourseEdit(editCourseObject: ICourseInfoForEdit): void {
        this.coursesService.updateCourse(editCourseObject);
    }


}
