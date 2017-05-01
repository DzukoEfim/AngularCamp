import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CoursesService } from '../../../services/courses.service';

@Component({
    selector: 'course-control-panel',
    styleUrls: ['./course-control-panel.component.css'],
    templateUrl: './course-control-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseControlPanelComponent {

    public searchText: string = '';

    constructor(
        private coursesService: CoursesService
    ) {

    }

    public searchCourse(): void {
        this.coursesService.updateCourseSearchText(this.searchText);
        this.coursesService.fetchCourses();
    }

    public onCourseClear(): void {
        this.coursesService.updateCourseSearchText('');
        this.coursesService.fetchCourses();
    }
}
