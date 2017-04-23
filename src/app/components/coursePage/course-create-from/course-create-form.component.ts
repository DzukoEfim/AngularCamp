import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'course-create-form',
    styleUrls: ['course-create-form.component.css'],
    templateUrl: 'course-create-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseCreateFormComponent implements OnInit {
    @Output('onCreateFormClose') onCreateFormClose = new EventEmitter<void>();
    @Output('onAddNewCourse') onAddNewCourse = new EventEmitter<Object>();

    public title: string = '';
    public duration: number = 0;
    public description: string = '';
    public dateField: string = '';
    public formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ){

    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            title: ['', Validators.maxLength(50)],
            description: ['', Validators.maxLength(500)],
            dateField: '',
            duration: 0
        });

        this.formGroup.valueChanges.subscribe(
            () => {
                console.log(this.formGroup);
                // console.log(this.formGroup.get('dateField').value)
            }
        )
    }

    public submit(formGroup: FormGroup): void {
        console.log(formGroup)
    }

    public onFormClose(): void {
        this.onCreateFormClose.emit();
    }

    public clearFormData(): void {
        this.title = '';
        this.duration = 0;
        this.description = '';
    }

    public onCourseCreate(): void {
        // let courseObject: ICourse = {
        //     title: this.title,
        //     duration: this.duration,
        //     description: this.description
        // };
        // this.clearFormData();
        // this.onAddNewCourse.emit(courseObject);
        console.log(this.formGroup)
    }
}
