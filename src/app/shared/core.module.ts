import { NgModule } from '@angular/core';

import { LoginService } from './services/login.service';
import { LoaderService } from './services/loader.service';
import { TimeService } from './services/time.service';
import { AuthorizedHttpService } from './services/authorized-http.service';

import { DateValidator } from './validators/date.validator';
import { NumberValidator } from './validators/number.validator'

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
        AuthorizedHttpService,
        DateValidator,
        NumberValidator
    ],
})
export class CoreModule {}
