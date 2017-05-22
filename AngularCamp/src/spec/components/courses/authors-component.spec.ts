import {TestBed, fakeAsync, tick} from "@angular/core/testing";
import { AuthorsSelectorComponent } from '../../../app/components/coursePage/course-create-from/course-create-form-authors/authors-component';
import { AuthorsValidator } from '../../../app/shared/validators/authors.validator';
import {By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('AuthorsSelectorComponent', () => {
    let component: any;
    let fixture: any;
    let debugElement: any;

    let authorsForTest = [
        {name: 'Test user 1', enabled: false},
        {name: 'Test user 2', enabled: false}
    ];

    let biggerListOfAuthorsForTest = [
        {name: 'Test user 3', enabled: false},
        {name: 'Test user 4', enabled: false},
        {name: 'Test user 5', enabled: false}
    ];

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                AuthorsSelectorComponent
            ],
            providers: [
                AuthorsValidator
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ],
        });

        fixture = TestBed.createComponent(AuthorsSelectorComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        component.authors = [];
        fixture.detectChanges();
    });

    it('should create as much elements as elemenets in Inmut array', () => {
        component.authors = authorsForTest;
        fixture.detectChanges();
        fixture.whenStable().then( () => {
            expect(debugElement.queryAll(By.css('.authors-test')).length).toBe(authorsForTest.length);
        })
    });

    it('should return array of values after clicking on input', () => {
        spyOn(component, 'onChange');
        component.authors = authorsForTest;
        fixture.detectChanges();

        fixture.whenStable().then( () => {
            const firstInputInArray = debugElement.queryAll(By.css('input'))[0];
            firstInputInArray.nativeElement.click();
            expect(component.onChange).toHaveBeenCalledWith([authorsForTest[0].name]);
        });
    });

    it('should test components value function', () => {
        component.authors = authorsForTest;
        fixture.detectChanges();

        const testCompareResult = authorsForTest.map( author => author.name);
        expect(component.value).toEqual(testCompareResult);
    });
});
