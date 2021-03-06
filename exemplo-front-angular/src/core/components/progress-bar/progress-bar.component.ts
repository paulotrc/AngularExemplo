import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {CoreProgressBarService} from './progress-bar.service';


@Component({
    selector     : 'core-progress-bar',
    templateUrl  : './progress-bar.component.html',
    styleUrls    : ['./progress-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CoreProgressBarComponent implements OnInit, OnDestroy
{
    bufferValue: number;
    mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
    value: number;
    visible: boolean;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CoreProgressBarService} _coreProgressBarService
     */
    constructor(
        private _coreProgressBarService: CoreProgressBarService
    )
    {
        // Set the defaults

        // Set the private defaults
        this.unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to the progress bar service properties

        // Buffer value
        this._coreProgressBarService.bufferValue
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((bufferValue) => {
                this.bufferValue = bufferValue;
            });

        // Mode
        this._coreProgressBarService.mode
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((mode) => {
                this.mode = mode;
            });

        // Value
        this._coreProgressBarService.value
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((value) => {
                this.value = value;
            });

        // Visible
        this._coreProgressBarService.visible
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((visible) => {
                this.visible = visible;
            });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
