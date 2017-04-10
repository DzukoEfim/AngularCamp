import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'course-control-panel',
    styleUrls: ['./course-control-panel.component.css'],
    templateUrl: './course-control-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
        this.onCourseSearch.emit({
            value: this.searchText
        });
    }

    public onAddNew(): void {
        this.onAddNewClick.emit();
    }

    public changeInput() {
        console.log(arguments);
    }
}
