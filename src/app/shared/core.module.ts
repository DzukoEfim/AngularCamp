import { NgModule } from '@angular/core';

import { LoginService } from './services/login.service';
import { LoaderService } from './services/loader.service';

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
        LoginService,
        LoaderService
    ],
})
export class CoreModule {}
