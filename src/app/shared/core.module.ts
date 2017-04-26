import { NgModule } from '@angular/core';

import { LoginService } from './services/login.service';
import { LoaderService } from './services/loader.service';
import { TimeService } from './services/time.service';
import { AuthorizedHttpService } from './services/authorized-http.service';
import { AuthorService } from './services/authors.service';
import { NumberValidator } from './validators/number.validator';
import { AuthorsValidator } from './validators/authors.validator';

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
        NumberValidator,
        AuthorService,
        AuthorsValidator
    ],
})
export class CoreModule {}
