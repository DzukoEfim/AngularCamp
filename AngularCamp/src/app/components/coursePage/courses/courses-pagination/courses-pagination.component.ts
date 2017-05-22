import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'courses-pagination',
    styleUrls: ['courses-pagination.component.css'],
    templateUrl: 'courses-pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CoursesPaginationComponent {
    @Input('totalCount') totalCount: number;
    @Input('coursesOnPage') coursesOnPage: number;
    @Input('current') current: number;

    @Output('navigateToStep') navigateToStep = new EventEmitter<number>();

    public getNumberOfPageAsArray() {
        let numberOfPages = this.getNumberOfPages(),
            result: Array<number> = [];

        for (let i = 0; i < numberOfPages; i++) {
            result.push(i + 1);
        }

        return result;
    }

    public getNumberOfPages() {
        return Math.ceil(this.totalCount / this.coursesOnPage);
    }

    public onNavigationChange(value: number): void {
        this.navigateToStep.emit(value);
    }

    public onNavigateToPrevStep(): void {
        if (this.current !== 1) {
            this.navigateToStep.emit(this.current - 1);
        }
    }

    public onNavigateToNextStep(): void {
        if (this.current !== this.getNumberOfPages()) {
            this.navigateToStep.emit(this.current + 1);
        }
    }
}
