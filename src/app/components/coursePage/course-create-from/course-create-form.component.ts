import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../../../shared/services/authors.service';
import { dateValidator } from '../../../shared/validators/date.validator';

@Component({
    selector: 'course-create-form',
    styleUrls: ['course-create-form.component.css'],
    templateUrl: 'course-create-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseCreateFormComponent implements OnInit, OnDestroy {
    @Output('onCreateFormClose') onCreateFormClose = new EventEmitter<void>();
    @Output('onAddNewCourse') onAddNewCourse = new EventEmitter<Object>();

    private authorsSub: any;
    public authors: Array<string> = [];
    public formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private _changeDetectionRed: ChangeDetectorRef,
        private authorService: AuthorService
    ) {

    }

    ngOnInit() {
        this.authorsSub = this.authorService.getAuthorsList()
            .map( res => { return res; } )
            .subscribe(
                res => {
                    this.authors = res.authors;
                    this._changeDetectionRed.markForCheck();
                }
            );

        this.formGroup = this.createNewClearFormGroup();

        this.formGroup.valueChanges.subscribe(
            () => {
                console.log(this.formGroup.get('title'));
            }
        );
    }

    private createNewClearFormGroup(): FormGroup {
        return this.formBuilder.group({
            title: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
            description: ['', Validators.compose([Validators.maxLength(500), Validators.required])],
            date: ['', Validators.compose([dateValidator, Validators.required])],
            duration: [0, Validators.required],
            authors: [[], Validators.required]
        });
    }

    ngOnDestroy() {
        this.authorsSub.unsubscribe();
    }

    public submit(formGroup: FormGroup): void {
        this.onAddNewCourse.emit(formGroup.value);
        this.clearFormData();
    }

    public onFormClose(): void {
        this.onCreateFormClose.emit();
    }

    public clearFormData(): void {
        this.formGroup = this.createNewClearFormGroup();
    }

    public showError(field: string): boolean {
        console.log(this.formGroup.get(field));
        return !this.formGroup.get(field).valid && this.formGroup.touched;
    }
}
