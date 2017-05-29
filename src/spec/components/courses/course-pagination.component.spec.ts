import {TestBed, fakeAsync, tick} from "@angular/core/testing";
import { CoursesPaginationComponent } from '../../../app/components/coursePage/courses/courses-pagination/courses-pagination.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('CoursesPaginationComponent', () => {
    let component: any;
    let fixture: any;
    let debugElement: any;
    let dummyCourse = {
        id: 1,
        title: 'Test title'
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                CoursesPaginationComponent
            ],
            providers: [
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(CoursesPaginationComponent);
        component = fixture.componentInstance;
        component.course = dummyCourse;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should call onCourseDelete with params from component after onDelete click', () => {
        // spyOn(component.onCourseDelete, 'emit');
        // component.onDelete();
        // expect(component.onCourseDelete.emit).toHaveBeenCalledWith(dummyCourse);
    });




});
