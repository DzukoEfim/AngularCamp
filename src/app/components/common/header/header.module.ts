import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';

import { AppHeaderComponent } from './header.component';
import { LogoComponent } from './logo/logo.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

const components = [
    AppHeaderComponent,
    LogoComponent,
    BreadcrumbsComponent
];

const declarations = [
    ...components
];

@NgModule({
    imports: [BrowserModule, RouterModule],
    declarations: [...declarations],
    exports: [...declarations]
})

export class HeaderModule {}
