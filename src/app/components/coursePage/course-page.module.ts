import { NgModule } from '@angular/core';

import { CoursePageComponent } from './course-page.component';

import { CourseControlPanelComponent } from './course-control-panel/course-control-panel.component';
import { CoursesComponent } from './courses/courses.component';
import { SingleCourseComponent } from './courses/course/single-course.component';
import { CourseCreateFormComponent } from './course-create-from/course-create-form.component';
import { CourseConfirmationAlertComponent } from './course-confirmation-alert/course-confirmation-alert.component';

import { CoursesService } from '../../services/courses.service';

const components = [
    CoursePageComponent,
    CourseControlPanelComponent,
    CoursesComponent,
    SingleCourseComponent,
    CourseCreateFormComponent,
    CourseConfirmationAlertComponent
];

const services = [
    CoursesService
];

const declarations = [
    ...components
];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations],
    providers: [
        ...services
    ]
})

export class CoursePageModule {}
