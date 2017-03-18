import { NgModule } from '@angular/core';

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
    declarations: [...declarations],
    exports: [...declarations]
})

export class HeaderModule {}
