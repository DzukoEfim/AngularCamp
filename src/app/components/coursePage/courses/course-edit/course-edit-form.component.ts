import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../../../../shared/services/authors.service';
import { dateValidator } from '../../../../shared/validators/date.validator';
import { CoursesService } from '../../../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../../../interfaces/course-interfaces/course-interface';
import { Observable } from 'rxjs';

@Component({
    selector: 'course-edit-form',
    styleUrls: ['course-edit-form.component.css'],
    templateUrl: 'course-edit-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseEditFormComponent implements OnInit {
    private course: ICourse;
    public authors: Array<string> = [];
    public showForm: boolean = false;
    public formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private _changeDetectionRed: ChangeDetectorRef,
        private authorService: AuthorService,
        private coursesService: CoursesService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.showForm = false;
    }

    ngOnInit() {
        this.formGroup = this.createNewClearFormGroup();

        Observable.combineLatest(
            this.coursesService.getSingleCourseById(),
            this.authorService.getAuthorsList(),
            this.route.params,
            (course, authors, data) => {
                return { course: course, authors: authors, data: data };
            })
            .subscribe(
                (res) => {
                    if (res.course && res.authors && res.data) {
                        let date = new Date(res.course.date),
                            formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();

                        this.course = res.course;
                        this.authors = res.authors.authors.map(author => {
                            let authorObject = {name: author, enabled: false};
                            if (res.course.authors.indexOf(author) > -1) {
                                authorObject.enabled = true;
                            }
                            return authorObject;
                        });

                        this.formGroup.patchValue({
                            title: this.course.title,
                            description: this.course.description,
                            date: formattedDate,
                            duration: this.course.duration,
                            authors: res.course.authors
                        });

                        this.showForm = true;
                        this._changeDetectionRed.markForCheck();
                    }
                }
            );

        this.route.params.subscribe(
            data => {
                this.coursesService.fetchSingleCourse(data['id']);
            }
        );
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

    public submit(formGroup: FormGroup): void {
        let course = formGroup.value;
        course.id = this.course.id;
        this.coursesService.updateCourse(course, this.navigateToCoursesPage.bind(this));
    }

    public navigateToCoursesPage(): void {
        this.router.navigate(['/courses']);
    }

    public clearFormData(): void {
        this.formGroup = this.createNewClearFormGroup();
    }

    public showError(field: string): boolean {
        return !this.formGroup.get(field).valid && this.formGroup.touched;
    }
}
