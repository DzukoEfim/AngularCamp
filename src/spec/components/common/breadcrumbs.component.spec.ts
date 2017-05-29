import {TestBed, fakeAsync, tick} from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BreadcrumbsComponent } from '../../../app/components/common/header/breadcrumbs/breadcrumbs.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {RouterTestingModule} from '@angular/router/testing';

import { Router, ActivatedRoute } from '@angular/router';


import { CoursesService } from '../../../app/services/courses.service'

describe('BreadcrumbsComponent', () => {
    let component: any;
    let fixture: any;
    let debugElement: any;
    let fakeRouter = {
        navigate: () => {}
    };
    let routerProvider: any;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                BreadcrumbsComponent
            ],
            providers: [
                {provide: Router, useValue: fakeRouter},
                {provide: CoursesService, useValue: {getSingleCourseById: () => {}}},
                {provide: ActivatedRoute, useValue: {root: {}}}
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(BreadcrumbsComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    it('should return any value (without any validation)', () => {
        expect(true).toBeTruthy();
    });




});
