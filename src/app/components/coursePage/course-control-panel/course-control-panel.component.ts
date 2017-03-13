import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'course-control-panel',
    styleUrls: ['./course-control-panel.component.css'],
    templateUrl: './course-control-panel.component.html'
})

export class CourseControlPanelComponent {
    @Input('searchText') searchText: string;
    @Output('onCourseSearch') onCourseSearch = new EventEmitter<void>();
    @Output('onCourseClear') onCourseClear = new EventEmitter<void>();

    public searchCourse(): void {
        console.log('course-control-panel find button click, search text - ', this.searchText);
        this.onCourseSearch.emit();
    }

    public filterCourse(): void {
        this.onCourseClear.emit();
    }

    public onAddNew(): void {
        console.log('on ADD NEW click');
    }
}
