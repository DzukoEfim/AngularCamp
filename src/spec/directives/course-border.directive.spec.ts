import {TestComponent} from './test-component';
import {CourseBorderDirective} from '../../app/directives/courses/course-border.directive';
import {TestBed} from "@angular/core/testing";
import {TimeService} from '../../app/shared/services/time.service';
import {ElementRef, NO_ERRORS_SCHEMA} from '@angular/core';
import * as moment from 'moment';
import {By} from '@angular/platform-browser';

describe('CourseBorderDirective', () => {

    let component: any;
    let fixture: any;
    let directiveAttrs: any;

    const newestCourseStyle = '2px solid rgb(41, 182, 246)';
    const twoWeekCourseStyle = '2px solid rgb(102, 187, 106)';

    class MockElementRef implements ElementRef {
        nativeElement = {}
    }

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                CourseBorderDirective
            ],
            providers: [
                TimeService,
                {provide: ElementRef, useClass: MockElementRef}
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

    });

    it('should add blue border in case newest course', () => {
        recreateComponent(getTomorrowDate());
        const borderStyle = getStyleFromNativeElement(directiveAttrs);
        expect(borderStyle.indexOf(newestCourseStyle) > -1).toBeTruthy();
    });

    it('should add red border in case 2-week course', () => {
        recreateComponent(getNearTwoWeekDate());
        const borderStyle = getStyleFromNativeElement(directiveAttrs);
        expect(borderStyle.indexOf(twoWeekCourseStyle) > -1).toBeTruthy();
    });

    it('should not add border in case old course', () => {
        recreateComponent(getOldCourse());
        const borderStyle = getStyleFromNativeElement(directiveAttrs);
        expect(borderStyle).toBeUndefined();
    });

    function recreateComponent(testDate) {
        TestBed.overrideComponent(TestComponent, {
            set: {
                template: `<div [courseBorder]="time" class="testingElement"></div>`
            }
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        directiveAttrs = fixture.debugElement.query(By.css('.testingElement')).nativeElement.attributes;
        component.time = testDate;
        fixture.detectChanges();
    }

    function getStyleFromNativeElement(attrs) {
        const numberOfAttrs = attrs.length;
        let result = void 0;

        if (numberOfAttrs > 0) {
            for (let i = 0; i < numberOfAttrs; i++) {
                if (attrs[i].name === 'style') {
                    result = attrs[i].value;
                    break;
                }
            }
        }

        return result
    }

    function getTomorrowDate() {
        const today = moment();
        const tomorrow = today.add(1, 'days');
        return moment(tomorrow).format("YYYY-MM-DD");
    }

    function getNearTwoWeekDate() {
        const today = moment();
        const result = today.add(-12, 'days');
        return moment(result).format("YYYY-MM-DD");
    }

    function getOldCourse() {
        const today = moment();
        const result = today.add(-17, 'days');
        return moment(result).format("YYYY-MM-DD");
    }

});
