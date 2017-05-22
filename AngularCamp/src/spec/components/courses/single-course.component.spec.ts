import {TestBed, fakeAsync, tick} from "@angular/core/testing";
import { SingleCourseComponent } from '../../../app/components/coursePage/courses/course/single-course.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DurationPipe } from '../../../app/pipes/duration.pipe';

describe('SingleCourseComponent', () => {
    let component: any;
    let fixture: any;
    let debugElement: any;
    let dummyCourse = {
        id: 1,
        title: 'Test title',
        duration: 60,
        description: 'Test description',
        topRated: true,
        date: '05/05/2017',
        authors: []
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                SingleCourseComponent,
                DurationPipe
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(SingleCourseComponent);
        component = fixture.componentInstance;
        component.course = dummyCourse;
        debugElement = fixture.debugElement;
    });

    it('should call onCourseDelete with params from component after onDelete click', () => {
        tick();
        spyOn(component.onCourseDelete, 'emit');
        component.onDelete();
        expect(component.onCourseDelete.emit).toHaveBeenCalledWith({id: dummyCourse.id, title: dummyCourse.title});
    });
});
