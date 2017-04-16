import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderModule } from './components/common/header/header.module';
import { CoursePageModule } from './components/coursePage/course-page.module';
import { FooterModule } from './components/common/footer/footer.module';
import { LoginPageModule } from './components/loginPage/login-form.module';

import { CoreModule } from './shared/core.module';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
    imports: [
        LoginPageModule,
        FormsModule,
        CommonModule,
        CoursePageModule,
        HeaderModule,
        FooterModule,
        CoreModule,
        HttpModule
    ],
    declarations: [
        AppComponent
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
