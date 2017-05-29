import {TestBed, fakeAsync, tick} from "@angular/core/testing";
import { CourseControlPanelComponent } from '../../../app/components/coursePage/course-control-panel/course-control-panel.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CoursesService } from '../../../app/services/courses.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CourseControlPanelComponent', () => {
    let component: any;
    let fixture: any;
    let debugElement: any;
    let coursesServiceProvider: any;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                CourseControlPanelComponent
            ],
            providers: [
                {provide: CoursesService, useValue: {fetchCourses: () => {}}}
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(CourseControlPanelComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        coursesServiceProvider = TestBed.get(CoursesService);
    });

    it('should call courseService fetch course with value', () => {
        spyOn(coursesServiceProvider, 'fetchCourses');

        let searchTextString = 'some search string';
        component.searchText = searchTextString;
        fixture.detectChanges();

        component.searchCourse();
        expect(coursesServiceProvider.fetchCourses).toHaveBeenCalledWith(searchTextString);
    });

    it('should fetch all courses after clicking onCourseClear', () => {
        spyOn(coursesServiceProvider, 'fetchCourses');

        let searchTextString = 'some search string';
        component.searchText = searchTextString;
        fixture.detectChanges();

        component.onCourseClear();

        expect(coursesServiceProvider.fetchCourses).toHaveBeenCalledWith('');
    })

});
