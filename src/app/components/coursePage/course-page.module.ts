import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CoursePageComponent } from './course-page.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { CourseControlPanelComponent } from './course-control-panel/course-control-panel.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesPaginationComponent } from './courses/courses-pagination/courses-pagination.component';
import { SingleCourseComponent } from './courses/course/single-course.component';
import { CourseCreateFormComponent } from './course-create-from/course-create-form.component';

import { DateFieldComponent } from './course-create-from/course-create-form-datefield/datefield-component';
import { DurationComponent } from './course-create-from/course-create-form-durationfield/duration-component';
import { AuthorsSelectorComponent } from './course-create-from/course-create-form-authors/authors-component';

import { CourseConfirmationAlertComponent } from './course-confirmation-alert/course-confirmation-alert.component';
import { CourseBorderDirective } from '../../directives/courses/course-border.directive';
import { CourseEditFormComponent } from './courses/course-edit/course-edit-form.component';

import { DurationPipe } from '../../pipes/duration.pipe';
import { SortByDatePipe } from '../../pipes/sort-by-date.pipe';
import { FilterCoursesPipe } from '../../pipes/filter-courses.pipe';

import { CoursesService } from '../../services/courses.service';

const forDeclarations = [
    CoursePageComponent,
    CoursesPaginationComponent,
    CourseControlPanelComponent,
    CoursesComponent,
    SingleCourseComponent,
    CourseCreateFormComponent,
    DateFieldComponent,
    DurationComponent,
    CourseConfirmationAlertComponent,
    CourseBorderDirective,
    DurationPipe,
    SortByDatePipe,
    AuthorsSelectorComponent,
    CourseEditFormComponent
];

const services = [
    CoursesService,
    FilterCoursesPipe
];

const declarations = [
    ...forDeclarations
];

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule],
    declarations: [...declarations],
    exports: [...declarations],
    providers: [
        ...services
    ]
})

export class CoursePageModule {}
