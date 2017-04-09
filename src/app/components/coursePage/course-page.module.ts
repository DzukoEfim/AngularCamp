import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoursePageComponent } from './course-page.component';
import { FormsModule }   from '@angular/forms';

import { CourseControlPanelComponent } from './course-control-panel/course-control-panel.component';
import { CoursesComponent } from './courses/courses.component';
import { SingleCourseComponent } from './courses/course/single-course.component';
import { CourseCreateFormComponent } from './course-create-from/course-create-form.component';
import { CourseConfirmationAlertComponent } from './course-confirmation-alert/course-confirmation-alert.component';

import { CourseBorderDirective } from '../../directives/courses/course-border.directive';

import { DurationPipe } from '../../pipes/duration.pipe';
import { SortByDatePipe } from '../../pipes/sort-by-date.pipe';
import { FilterCoursesPipe } from '../../pipes/filter-courses.pipe';

import { CoursesService } from '../../services/courses.service';

const forDeclarations = [
    CoursePageComponent,
    CourseControlPanelComponent,
    CoursesComponent,
    SingleCourseComponent,
    CourseCreateFormComponent,
    CourseConfirmationAlertComponent,
    CourseBorderDirective,
    DurationPipe,
    SortByDatePipe
];

const services = [
    CoursesService,
    FilterCoursesPipe
];

const declarations = [
    ...forDeclarations
];

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [...declarations],
    exports: [...declarations],
    providers: [
        ...services
    ]
})

export class CoursePageModule {}
