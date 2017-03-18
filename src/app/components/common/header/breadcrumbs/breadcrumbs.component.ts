import { Component, Input } from '@angular/core';
import { IBreadcrumb }  from '../../../../interfaces/course-interfaces/breacrumbs-interface';

@Component({
    selector: 'course-breadcrumbs',
    styleUrls: ['./breadcrumbs.component.css'],
    templateUrl: './breadcrumbs.component.html'
})

export class BreadcrumbsComponent {
    @Input('breadcrumbs') breadcrumbs;

    public onBreadcrumbClickHandler = function (valueObject: IBreadcrumb) {
        console.log(valueObject);
    };
}
