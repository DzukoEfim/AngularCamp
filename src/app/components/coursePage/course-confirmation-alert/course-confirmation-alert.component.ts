import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'course-confirmation-alert',
    styleUrls: ['course-confirmation-alert.component.css'],
    templateUrl: 'course-confirmation-alert.component.html'
})

export class CourseConfirmationAlertComponent {
    @Input('id') id: number;
    @Output('onClose') onClose = new EventEmitter<void>();
    @Output('onSubmit') onSubmit = new EventEmitter<number>();

    public onCloseClick(): void {
        this.onClose.emit();
    }

    public onSubmitClick(): void {
        this.onSubmit.emit(this.id);
    }
}
