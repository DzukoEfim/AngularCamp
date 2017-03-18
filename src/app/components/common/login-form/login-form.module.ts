import {NgModule} from '@angular/core';

import { LoginFormComponent } from './login-form.component';


const components = [
    LoginFormComponent
];

const declarations = [
    ...components
];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations]
})

export class Footermodule{}