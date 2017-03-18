import { Component } from '@angular/core';
import { ICourse, ICourseCreate } from '../../interfaces/course-interfaces/course-interface';
import { CoursesService } from '../../services/courses.service';

@Component({
    selector: 'course-page',
    styleUrls: ['./course-page.component.css'],
    templateUrl: './course-page.component.html'
})

export class CoursePageComponent {
    courses: Array<ICourse>;
    searchText: string;
    showCreateCourseForm: boolean = false;

    constructor( private coursesService: CoursesService ) {
        this.coursesService = coursesService;
        this.updateCourseList();
    }

    private updateCourseList(): void {
        this.courses = this.coursesService.getCoursesList();
    }

    public onCourseSearch(): Array<ICourse> {
        let filteredArray: ICourse[] = [];

        if (this.searchText === '') {
            return filteredArray;
        }

        for (let course of this.courses) {
            if (course.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) {
                filteredArray.push(course);
            }
        }
        return filteredArray;
    }

    public onCourseClear(): void {
        this.searchText = '';
    }

    public onAddNewClick() {
        this.showCreateCourseForm = true;
    }

    public onCreateFormClose() {
        this.showCreateCourseForm = false;
    }

    public onAddNewCourse(courseObject: ICourseCreate): void {
        this.coursesService.createCourse(courseObject.title, courseObject.duration, courseObject.description);
        this.updateCourseList();
    }

    public onCourseDelete(id: number) {
        this.coursesService.deleteCourse(id);
        this.updateCourseList();
    }


}
