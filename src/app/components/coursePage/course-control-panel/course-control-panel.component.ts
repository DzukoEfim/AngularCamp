import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { CoursesService } from '../../../services/courses.service';

@Component({
    selector: 'course-control-panel',
    styleUrls: ['./course-control-panel.component.css'],
    templateUrl: './course-control-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseControlPanelComponent {
    @Output('onAddNewClick') onAddNewClick = new EventEmitter();

    public searchText: string = '';

    constructor(
        private coursesService: CoursesService
    ) {

    }

    public searchCourse(): void {
        this.coursesService.updateCourseSearchText(this.searchText);
        this.coursesService.fetchCourses(1, 2);
    }

    public onCourseClear(): void {
        this.coursesService.updateCourseSearchText('');
        this.coursesService.fetchCourses(1, 2);
    }

    public onAddNew(): void {
        this.onAddNewClick.emit();
    }

    public changeInput() {
        console.log(arguments);
    }
}
