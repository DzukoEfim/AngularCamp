import { Component, NgZone, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from './services/courses.service';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    public title: string;

    constructor(
        private _ngZone: NgZone,
        private coursesService: CoursesService
    ) {

    }

    ngOnInit() {
        this.coursesService.fetchCourses();
        this._ngZone.onUnstable.subscribe( () => {
            console.time('test');
        });
        this._ngZone.onStable.subscribe( () => {
            console.timeEnd('test');
        });
    }
}
