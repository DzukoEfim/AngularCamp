import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'course-control-panel',
    styleUrls: ['./course-control-panel.component.css'],
    templateUrl: './course-control-panel.component.html'
})

export class CourseControlPanelComponent {
    @Output('onCourseSearch') onCourseSearch = new EventEmitter<Object>();
    @Output('onAddNewClick') onAddNewClick = new EventEmitter();

    public searchText: string = '';

    public searchCourse(): void {
        this.onCourseSearch.emit({
            value: this.searchText
        });
    }

    public onCourseClear(): void {
        this.searchText = '';
    }

    public onAddNew(): void {
        this.onAddNewClick.emit();
    }

    public changeInput() {
        console.log(arguments);
    }
}
