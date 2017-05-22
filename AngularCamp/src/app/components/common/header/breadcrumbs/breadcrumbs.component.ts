import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { IBreadcrumb }  from '../../../../interfaces/course-interfaces/breacrumbs-interface';
import { Observable } from 'rxjs';

import { CoursesService } from '../../../../services/courses.service';

@Component({
    selector: 'course-breadcrumbs',
    styleUrls: ['./breadcrumbs.component.css'],
    templateUrl: './breadcrumbs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BreadcrumbsComponent implements OnInit {
    public breadcrumbs: IBreadcrumb[] = [];

    constructor(
        private router: Router,
        private activatedRout: ActivatedRoute,
        private coursesService: CoursesService,
        private _changeDetectionRef: ChangeDetectorRef,
    ) {

    }
    ngOnInit() {
        Observable.combineLatest(
            this.coursesService.getSingleCourseById(),
            this.router.events.filter(event => { return event instanceof NavigationEnd; }),

            (courses, singleCourse, event) => { return {courses: courses, singleCourse: singleCourse, event: event}; }
        )
            .subscribe(
                () => {
                    this.breadcrumbs = [];

                    let root: ActivatedRoute = this.activatedRout.root;
                    this.createBreadcrumbs(root, '', this.breadcrumbs);
                    this._changeDetectionRef.markForCheck();
                }
            );
    }

    private createBreadcrumbs(activatedRout: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        let children: ActivatedRoute[] = activatedRout.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (let child of children) {
            if ( child.snapshot.data.hasOwnProperty('skipBreadcrumb')) {
                continue;
            }

            let routeUrl = child.snapshot.url.map(urlPart => {
                return urlPart.path;
            }).join('/');

            url += `/${routeUrl}`;
            breadcrumbs.push({
                name: child.snapshot.data['breadcrumb'] === 'singleCourse' ?
                        this.coursesService.getTitleById(child.snapshot.params['id']) :
                        child.snapshot.data['breadcrumb'],
                url: url,
                disabled: url === this.router.url
            });
            this.createBreadcrumbs(child, url, breadcrumbs);
        }
    }
}
