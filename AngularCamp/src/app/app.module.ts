import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Routes } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderModule } from './components/common/header/header.module';
import { CoursePageModule } from './components/coursePage/course-page.module';
import { FooterModule } from './components/common/footer/footer.module';
import { LoginPageModule } from './components/loginPage/login-form.module';
import { NotFoundComponent } from './components/common/404/404.component';

import { CoreModule } from './shared/core.module';

import { StoreModule } from '@ngrx/store';
import { loginReducer } from './reducers/loginReducer';
import { coursesReducers } from './reducers/coursesReducers';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { useLogMonitor } from '@ngrx/store-log-monitor';

@NgModule({
    imports: [
        LoginPageModule,
        FormsModule,
        CommonModule,
        CoursePageModule,
        HeaderModule,
        FooterModule,
        CoreModule,
        HttpModule,
        RouterModule.forRoot(Routes, { useHash: true }),
        StoreModule.provideStore(
            {
                userInfo: loginReducer,
                courses: coursesReducers
            },
            {
                userInfo: {
                    loggedStatus: false,
                },
                courses: {
                    coursesList: [],
                    currentStep: 1,
                    coursesOnPage: 2
                }
            })
    ],
    declarations: [
        AppComponent,
        NotFoundComponent
    ],

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
