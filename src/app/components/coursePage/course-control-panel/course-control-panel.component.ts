import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'course-control-panel',
    styleUrls: ['./course-control-panel.component.css'],
    templateUrl: './course-control-panel.component.html'
})

export class CourseControlPanelComponent {
    @Input('searchText') searchText: string;
    @Output('onCourseSearch') onCourseSearch = new EventEmitter();
    @Output('onCourseClear') onCourseClear = new EventEmitter();

    public searchCourse() {
        console.log('course-control-panel find button click, search text - ', this.searchText);
        this.onCourseSearch.emit();
    }

    public filterCourse() {
        this.onCourseClear.emit();
    }

    public onAddNew() {
        console.log('on ADD NEW click');
    }
}
