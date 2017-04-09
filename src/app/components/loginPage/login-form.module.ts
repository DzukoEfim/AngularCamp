import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { LoginFormComponent } from './login-form.component';

const components = [
    LoginFormComponent
];

const declarations = [
    ...components
];

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [...declarations],
    exports: [...declarations]
})

export class LoginPageModule {}
