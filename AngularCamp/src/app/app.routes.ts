import { CoursePageComponent } from './components/coursePage/course-page.component';
import { CoursesComponent } from './components/coursePage/courses/courses.component';
import { CourseCreateFormComponent } from './components/coursePage/course-create-from/course-create-form.component';
import { CourseEditFormComponent } from './components/coursePage/courses/course-edit/course-edit-form.component';
import { LoginFormComponent } from './components/loginPage/login-form.component';
import { NotFoundComponent } from './components/common/404/404.component';
import { AuthGuard } from './shared/services/authGuard.service';

export const Routes = [
    { path: '',  redirectTo: 'courses', pathMatch: 'full' },
    { path: 'login', component: LoginFormComponent },

    {
        path: 'courses',
        component: CoursePageComponent,
        canActivate: [AuthGuard],
        data: {breadcrumb: 'Courses'},

        children: [
            {
                path: 'new',
                component: CourseCreateFormComponent,
                canActivate: [AuthGuard],
                data: {breadcrumb: 'new'}
            },
            {
                path: ':id',
                component: CourseEditFormComponent,
                canActivate: [AuthGuard],
                data: {breadcrumb: 'singleCourse'}
            },
            {
                path: '',
                component: CoursesComponent,
                canActivate: [AuthGuard],
                data: {skipBreadcrumb: true},
            },

        ]

    },

    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '404'   }
];
