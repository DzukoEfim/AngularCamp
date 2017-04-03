import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { IBreadcrumb }  from '../../../interfaces/course-interfaces/breacrumbs-interface';
import { LoginService } from '../../../shared/services/login.service';

@Component({
    selector: 'page-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppHeaderComponent implements OnInit {
    public breadcrumbs: IBreadcrumb[];
    public userInfo: Object;

    constructor(private loginService: LoginService, private changeDetector: ChangeDetectorRef) {
        this.changeDetector = changeDetector;
        this.loginService = loginService;

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

    ngOnInit() {
        this.loginService.userInfo.subscribe( (userInfo) => {
            this.userInfo = userInfo;
            this.changeDetector.markForCheck();
        });
    }

    onBreadcrumbClick = function (name: string): void {
        console.log(name);
    };

    public logOutUser(): void {
        this.loginService.logOut();
    }

}
