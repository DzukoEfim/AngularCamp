import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IBreadcrumb }  from '../../../../interfaces/course-interfaces/breacrumbs-interface';

@Component({
    selector: 'course-breadcrumbs',
    styleUrls: ['./breadcrumbs.component.css'],
    templateUrl: './breadcrumbs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BreadcrumbsComponent {
    @Input('breadcrumbs') breadcrumbs;

    public onBreadcrumbClickHandler = function (valueObject: IBreadcrumb) {
        console.log(valueObject);
    };
}
