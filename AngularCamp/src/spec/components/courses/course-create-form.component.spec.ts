import {TestBed, async, ComponentFixture, tick, fakeAsync} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA, DebugElement} from '@angular/core';
import {CourseCreateFormComponent} from '../../../app/components/coursePage/course-create-from/course-create-form.component';
import {CoursesService} from '../../../app/services/courses.service';
import {AuthorService} from '../../../app/shared/services/authors.service';

import {DateFieldComponent} from '../../../app/components/coursePage/course-create-from/course-create-form-datefield/datefield-component';
import {AuthorsSelectorComponent} from '../../../app/components/coursePage/course-create-from/course-create-form-authors/authors-component';
import {DurationComponent} from '../../../app/components/coursePage/course-create-from/course-create-form-durationfield/duration-component';

import {NumberValidator} from '../../../app/shared/validators/number.validator';
import {AuthorsValidator} from '../../../app/shared/validators/authors.validator';
import {dateValidator} from '../../../app/shared/validators/date.validator';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

import { Router } from '@angular/router';

import {BehaviorSubject} from 'rxjs';

describe('CourseCreateFormComponent', () => {

    let component: CourseCreateFormComponent;
    let fixture: ComponentFixture<CourseCreateFormComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;
    let coursesServiceProvider: any;
    let authorService: any;
    let authorsDummyObservable: any;
    let authorsNames: Array<string>;
    let fakeRouter = {
        navigate: () => {}
    };
    let routerProvider: any;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CourseCreateFormComponent,
                DateFieldComponent,
                AuthorsSelectorComponent,
                DurationComponent
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                {
                    provide: CoursesService, useValue: {
                        fetchCourses: () => {},
                        createCourse: () => {}
                }
                },
                {
                    provide: AuthorService, useValue: {
                    getAuthorsList: () => {
                    }
                }
                },
                {provide: dateValidator, useValue: dateValidator},
                {provide: Router, useValue: fakeRouter},
                NumberValidator,
                AuthorsValidator
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(CourseCreateFormComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = fixture.nativeElement;
        authorsNames = ['Test author 1', 'Test author 2'];
        authorsDummyObservable = new BehaviorSubject({authors: ['Test author 1', 'Test author 2']}).asObservable();
        coursesServiceProvider = TestBed.get(CoursesService);
        routerProvider = TestBed.get(Router);


        authorService = TestBed.get(AuthorService);
        spyOn(authorService, 'getAuthorsList').and.returnValue(authorsDummyObservable);
        spyOn(coursesServiceProvider, 'fetchCourses').and.returnValue(true);
        component.ngOnInit();

    });

    function generateAuthorsObject() {
        return authorsNames.map(author => {
            return {name: author, enabled: false};
        })
    }

    it('should call for authors', () => {
        expect(authorService.getAuthorsList).toHaveBeenCalled();
    });

    it('should generate default list of authors', () => {
        expect(component.authors.length).toBe(generateAuthorsObject().length);
    });

    it('should create form', () => {
        expect(component.formGroup.get('title').value).toBe('');
        expect(component.formGroup.get('description').value).toBe('');
        expect(component.formGroup.get('date').value).toBe('');
        expect(component.formGroup.get('duration').value).toBe(0);
        expect(component.formGroup.get('authors').value.length).toBe(0);
    });

    it('initially form should be invalid', () => {
        expect(component.formGroup.valid).toBeFalsy();
    });

    it('initially submit button should be disabled', () => {
        spyOn(component, 'submit');
        fixture.detectChanges();
        const button = getButtonByType('submit');
        fixture.detectChanges();
        button.nativeElement.click();
        expect(component.submit).not.toHaveBeenCalled();
    });

    it('should enable button if all fields are valid', fakeAsync(() => {
        spyOn(component, 'submit');
        fixture.detectChanges();

        component.formGroup.get('title').setValue('test title');
        component.formGroup.get('description').setValue('test description');
        component.formGroup.get('date').setValue('05/05/2017');
        component.formGroup.get('duration').setValue(60);
        component.formGroup.get('authors').setValue(['Test author 1']);

        fixture.detectChanges();
        expect(component.formGroup.valid).toBeTruthy();
        const button = getButtonByType('submit');
        button.nativeElement.click();
        fixture.detectChanges();
        // expect(component.submit).toHaveBeenCalled();
    }));

    it('should call for createCourse function of courseService on submit form', () => {
       spyOn(coursesServiceProvider, 'createCourse');
       component.submit(component.formGroup);
       expect(coursesServiceProvider.createCourse).toHaveBeenCalled();
    });

    it('should navigate to coursePage after clicking navigateToCoursePage', () => {
        spyOn(routerProvider, 'navigate');
        component.navigateToCoursesPage();
        expect(routerProvider.navigate).toHaveBeenCalledWith(['/courses']);
    });

    function getButtonByType(type) {
        return debugElement.query(By.css(`button[type="${type}"]`));
    }
});
