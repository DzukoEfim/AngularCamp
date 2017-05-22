import {TestBed, fakeAsync, tick} from "@angular/core/testing";
import { DurationComponent } from '../../../app/components/coursePage/course-create-from/course-create-form-durationfield/duration-component';
import {By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('DurationComponent', () => {
    let component: any;
    let fixture: any;
    let debugElement: any;

    let correctDuration = 120;


    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                DurationComponent
            ],
            providers: [
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
        });

        fixture = TestBed.createComponent(DurationComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    it('should return any value (without any validation)', () => {
        spyOn(component, 'onChange');
        component.setValue({target: {value: correctDuration}});
        fixture.detectChanges();
        expect(component.onChange).toHaveBeenCalledWith(correctDuration);
    });




});
