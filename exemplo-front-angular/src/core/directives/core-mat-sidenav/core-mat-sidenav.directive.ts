import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {CoreMatchMediaService} from '../../services/match-media.service';
import {CoreMatSidenavHelperService} from './core-mat-sidenav.service';
import {MatSidenav} from '@angular/material/sidenav';

@Directive({
    selector: '[coreMatSidenavHelper]'
})
export class CoreMatSidenavHelperDirective implements OnInit, OnDestroy {
    @HostBinding('class.mat-is-locked-open')
    isLockedOpen: boolean;

    @Input()
    coreMatSidenavHelper: string;

    @Input()
    matIsLockedOpen: string;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CoreMatchMediaService} coreMatchMediaService
     * @param {CoreMatSidenavHelperService} coreMatSidenavHelperService
     * @param {MatSidenav} matSidenav
     * @param {MediaObserver} observableMedia
     */
    constructor(
        private coreMatchMediaService: CoreMatchMediaService,
        private coreMatSidenavHelperService: CoreMatSidenavHelperService,
        private matSidenav: MatSidenav,
        private observableMedia: MediaObserver
    ) {
        // Set the defaults
        this.isLockedOpen = true;

        // Set the private defaults
        this.unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Register the sidenav to the service
        this.coreMatSidenavHelperService.setSidenav(this.coreMatSidenavHelper, this.matSidenav);

        if ( this.observableMedia.isActive(this.matIsLockedOpen) ) {
            this.isLockedOpen = true;
            this.matSidenav.mode = 'side';
            this.matSidenav.toggle(true);
        } else {
            this.isLockedOpen = false;
            this.matSidenav.mode = 'over';
            this.matSidenav.toggle(false);
        }

        this.coreMatchMediaService.onMediaChange
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(() => {
                if ( this.observableMedia.isActive(this.matIsLockedOpen) ) {
                    this.isLockedOpen = true;
                    this.matSidenav.mode = 'side';
                    this.matSidenav.toggle(true);
                } else {
                    this.isLockedOpen = false;
                    this.matSidenav.mode = 'over';
                    this.matSidenav.toggle(false);
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}

@Directive({
    selector: '[coreMatSidenavToggler]'
})
export class CoreMatSidenavTogglerDirective {
    @Input()
    coreMatSidenavToggler: string;

    /**
     * Constructor
     *
     * @param {CoreMatSidenavHelperService} coreMatSidenavHelperService
     */
    constructor(
        private coreMatSidenavHelperService: CoreMatSidenavHelperService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On click
     */
    @HostListener('click')
    onClick(): void {
        this.coreMatSidenavHelperService.getSidenav(this.coreMatSidenavToggler).toggle();
    }
}
