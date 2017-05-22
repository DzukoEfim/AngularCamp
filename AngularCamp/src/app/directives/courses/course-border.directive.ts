import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { TimeService } from '../../shared/services/time.service';


@Directive({
    selector: '[courseBorder]'
})

export class CourseBorderDirective implements OnInit {

    @Input('courseBorder') courseBorder: string;

    constructor(
        private el: ElementRef,
        private timeService: TimeService
    ) {
    }

    ngOnInit() {
        let currentDate = new Date(),
            courseDateCreate = new Date(this.courseBorder),
            timeDiff = this.timeService.getDiffBetweenDatesInDays(courseDateCreate, currentDate);

        if (timeDiff > 0) {
            this.el.nativeElement.style.border = '2px solid #29B6F6';
        }

        if (timeDiff < 0 && this.timeService.getDaysInDate(courseDateCreate) >= this.timeService.getDaysInDate(currentDate) - 14) {
            this.el.nativeElement.style.border = '2px solid #66BB6A';
        }
    }
}
