import {TestBed, fakeAsync, tick, __core_private_testing_placeholder__} from "@angular/core/testing";
import { CoursesComponent } from '../../../app/components/coursePage/courses/courses.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NO_ERRORS_SCHEMA } from '@angular/core';

import {CoursesService} from '../../../app/services/courses.service';
import { CoursesActions } from '../../../app/actions/coursesActions';
import {Observable} from "rxjs";

describe('CoursesComponent', () => {
    let component: any;
    let fixture: any;
    let debugElement: any;
    let coursesServiceProvider: any;
    let coursesActionsProvider: any;
    let currentStep = 1;
    let coursesOnPage = 2;
    let dummyCourses = {
        coursesList: [
            {
                title: 'Test course 1',
                id: 1
            },
            {
                title: 'Test course 2',
                id: 2
            },
            {
                title: 'Test course 3',
                id: 3
            }
        ],
        currentStep: currentStep,
        coursesOnPage: coursesOnPage
    };
    let dummyCourseInfo = {
        id: 2, title: 'Test course title'
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                CoursesComponent
            ],
            providers: [
                {provide: CoursesService, useValue: {deleteCourse: () => {}}},
                {provide: CoursesActions, useValue:
                    {
                        getCourses: () => {},
                        navigateToCoursesPage: () => {}
                    }
                }
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(CoursesComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        coursesServiceProvider = TestBed.get(CoursesService);
        coursesActionsProvider = TestBed.get(CoursesActions);

        spyOn(coursesActionsProvider, 'getCourses').and.returnValue(Observable.of(dummyCourses));
        component.ngOnInit();
    });

    it(`should add ${coursesOnPage} courses at page after initing component`, () => {
        fixture.detectChanges();
        expect(component.courses.length).toBe(coursesOnPage);
    });

    it('should set component.totalCount as length of coursesList', () => {
        fixture.detectChanges();
        expect(component.totalCount).toBe(dummyCourses.coursesList.length);
    });

    it('should navigate to step(step - parameter to navigate function)', () => {
        const step = 3;
        spyOn(coursesActionsProvider, 'navigateToCoursesPage');
        component.navigateToStep(step);
        fixture.detectChanges();
        expect(component.currentStep).toBe(step);
        expect(coursesActionsProvider.navigateToCoursesPage).toHaveBeenCalledWith(step);
    });

    it('should call for closeAler and deleteCourse with id as param after clicking Delete Course button', () => {
        const idToDelete = 2;
        spyOn(component, 'closeAlert');
        spyOn(coursesServiceProvider, 'deleteCourse');

        component.deleteCourse(idToDelete);
        expect(coursesServiceProvider.deleteCourse).toHaveBeenCalledWith(idToDelete);
        expect(component.closeAlert).toHaveBeenCalled();
    });

    it('should clear course info after calling cloaseAlert', () => {
         component.courseInfo = dummyCourseInfo;
         component.showDeleteAlert = true;

         component.closeAlert();
         fixture.detectChanges()
         expect(component.courseInfo).toBeNull();
         expect(component.showDeleteAlert).toBeFalsy();
    });

    it('should set userInfo and open alert windows after calling openAlert function', () => {
        component.openAlert(dummyCourseInfo);
        fixture.detectChanges();

        expect(component.courseInfo).toEqual(dummyCourseInfo);
        expect(component.showDeleteAlert).toBeTruthy();
    });

});
