import { Component, NgZone, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
    public title: string;

    constructor( private _ngZone: NgZone, ) {}

    ngOnInit() {
        this._ngZone.onUnstable.subscribe( () => {
            console.time('test');
        });
        this._ngZone.onStable.subscribe( () => {
            console.timeEnd('test');
        });
    }

    ngOnDestroy() {
    }

}
