import {TestBed, fakeAsync, tick} from "@angular/core/testing";
import { DateFieldComponent } from '../../../app/components/coursePage/course-create-from/course-create-form-datefield/datefield-component';
import {By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('DateFieldComponent', () => {
    let component: any;
    let fixture: any;
    let debugElement: any;

    let correctDate = '05/05/2017';


    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                DateFieldComponent
            ],
            providers: [
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
        });

        fixture = TestBed.createComponent(DateFieldComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    it('should return value in case of correct date', () => {
        spyOn(component, 'onChange');
        component.setValue({target: {value: correctDate}});
        fixture.detectChanges();
        expect(component.onChange).toHaveBeenCalledWith(correctDate);
    });

    it('should return null in case of incorrectDate', () => {
        spyOn(component, 'onChange');
        component.setValue({target: {value: 'some random value'}});
        fixture.detectChanges();
        expect(component.onChange).toHaveBeenCalledWith(null);
    })
});
