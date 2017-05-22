import { NgModule } from '@angular/core';

import { CopyrightComponent } from './copyright/copyright.component';


const components = [
    CopyrightComponent
];

const declarations = [
    ...components
];

@NgModule({
    declarations: [...declarations],
    exports: [...declarations]
})

export class FooterModule {}
