import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../../../../shared/services/authors.service';
import { dateValidator } from '../../../../shared/validators/date.validator';
import { CoursesService } from '../../../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from '../../../../interfaces/course-interfaces/course-interface';

@Component({
    selector: 'course-edit-form',
    styleUrls: ['course-edit-form.component.css'],
    templateUrl: 'course-edit-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseEditFormComponent implements OnInit, OnDestroy {
    private authorsSub: any;
    private courseSub: any;
    private course: ICourse;
    public authors: Array<string> = [];
    public courseAuthors: Array<{name: string, enabled: boolean}> = [];
    public showForm: boolean = false;
    public formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private _changeDetectionRed: ChangeDetectorRef,
        private authorService: AuthorService,
        private coursesService: CoursesService,
        private route: ActivatedRoute
    ) {
        this.showForm = false;
    }

    ngOnInit() {
        this.courseSub = this.coursesService.getSingleCourseById()
            .subscribe(
                course => {
                    this.course = course;
                    this.courseAuthors = course.authors.map(author => {
                        return  {name: author, enabled: true}
                    });

                    this.authorsSub = this.authorService.getAuthorsList()
                        .map( res => { return res; } )
                        .subscribe(
                            res => {
                                this.authors = res.authors;
                                this.formGroup = this.createNewClearFormGroup();
                                this.showForm = true;
                                this._changeDetectionRed.markForCheck();
                            }
                        );
                }
            );



        this.route.params.subscribe(
            data => {
                this.coursesService.fetchSingleCourse(data['id']);
            }
        );

        this.formGroup = this.createNewClearFormGroup();
    }

    private createNewClearFormGroup(): FormGroup {
        return this.formBuilder.group({
            title: [this.course ? this.course.title : '', Validators.compose([Validators.maxLength(50), Validators.required])],
            description: [this.course ? this.course.description : '', Validators.compose([Validators.maxLength(500), Validators.required])],
            date: [this.course ? this.course.date : '', Validators.compose([dateValidator, Validators.required])],
            duration: [this.course ? this.course.duration : 0, Validators.required],
            authors: [this.course ? this.course.authors : [], Validators.required]
        });
    }

    ngOnDestroy() {
        this.authorsSub.unsubscribe();
    }

    public submit(formGroup: FormGroup): void {
        this.coursesService.createCourse(formGroup.value);
    }

    public clearFormData(): void {
        this.formGroup = this.createNewClearFormGroup();
    }

    public showError(field: string): boolean {
        return !this.formGroup.get(field).valid && this.formGroup.touched;
    }
}
