import {TestBed, fakeAsync, tick} from "@angular/core/testing";
import { CourseConfirmationAlertComponent } from '../../../app/components/coursePage/course-confirmation-alert/course-confirmation-alert.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CourseConfirmationAlertComponent', () => {
    let component: any;
    let fixture: any;
    let debugElement: any;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                CourseConfirmationAlertComponent
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(CourseConfirmationAlertComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    it('should call bound onClose function after clicking close', () => {
        spyOn(component.onClose, 'emit');
        component.onCloseClick();
        expect(component.onClose.emit).toHaveBeenCalled();
    });

    it('should call bound onSubmitClick with params which were passed to component', () => {
        const fakeCourseInfo = {title: 'TestTitle', id: 1};
        spyOn(component.onSubmit, 'emit');
        console.log(component);
        component.courseInfo = fakeCourseInfo;
        component.onSubmitClick();
        expect(component.onSubmit.emit).toHaveBeenCalledWith(fakeCourseInfo.id);
    })

});
