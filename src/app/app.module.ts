import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { CoursePageComponent } from '../app/components/coursePage/course-page.component';
import { AppHeaderComponent } from '../app/components/coursePage/header/header.component';
import { LogoComponent } from '../app/components/coursePage/header/course-logo/course-logo.component';
import { BreadcrumbsComponent } from '../app/components/coursePage/header/breadcrumbs/breadcrumbs.component';
import { LoginFormComponent } from '../app/components/coursePage/header/login-form/login-form.component';

import { CourseControlPanel } from '../app/components/coursePage/course-control-panel/course-control-panel.component';
import { CoursesComponent } from '../app/components/coursePage/courses/courses.component';
import { SingleCourse } from '../app/components/coursePage/courses/course/single-course.component';

import { CopyrightComponent } from '../app/components/coursePage/footer/copyright/copyright.component';


import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        CoursePageComponent,
        AppHeaderComponent,
        LogoComponent,
        BreadcrumbsComponent,
        LoginFormComponent,
        CourseControlPanel,
        CoursesComponent,
        SingleCourse,
        CopyrightComponent
    ],
    // providers: [
    //   ApiService
    // ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {}

    hmrOnInit(store) {
        console.log('HMR store', store);
    }
    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
