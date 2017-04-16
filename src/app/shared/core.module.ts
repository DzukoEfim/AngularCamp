import { NgModule } from '@angular/core';

import { LoginService } from './services/login.service';
import { LoaderService } from './services/loader.service';
import { TimeService } from './services/time.service';
import { AuthorizedHttpService } from './services/authorized-http.service';

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
        LoaderService,
        TimeService,
        AuthorizedHttpService
    ],
})
export class CoreModule {}
