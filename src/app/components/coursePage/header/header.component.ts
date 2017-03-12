import { Component } from '@angular/core';

import { IBreadcrumb }  from '../../../interfaces/course-interfaces/breacrumbs-interface';

@Component({
    selector: 'course-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})

export class AppHeaderComponent {
    breadcrumbs: IBreadcrumb[];

    constructor() {
        this.breadcrumbs = [
            {
                name: 'main',
                url: '#'
            },
            {
                name: 'courses',
                url: 'test 2'
            }
        ];
    }

    onBreadcrumbClick = function (name: string) {
        console.log(name);
    };

}
