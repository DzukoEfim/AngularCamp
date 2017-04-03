import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'course-confirmation-alert',
    styleUrls: ['course-confirmation-alert.component.css'],
    templateUrl: 'course-confirmation-alert.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseConfirmationAlertComponent {
    @Input('courseInfo') courseInfo: {id: number, title: string} ;
    @Output('onClose') onClose = new EventEmitter<void>();
    @Output('onSubmit') onSubmit = new EventEmitter<number>();

    public onCloseClick(): void {
        this.onClose.emit();
    }

    public onSubmitClick(): void {
        this.onSubmit.emit(this.courseInfo.id);
    }
}
