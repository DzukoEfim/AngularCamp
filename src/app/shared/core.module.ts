import { NgModule } from '@angular/core';

import { LoginService } from './services/login.service';

const angularModules = [
];

@NgModule({
    imports: [
        ...angularModules
    ],
    declarations: [
        ...angularModules
    ],

    providers: [
        LoginService
    ],
})
export class CoreModule {

}
