import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { navigation } from '../../../../navigation/navigation';
import {CoreConfigService} from '../../../../../core/services/config.service';

@Component({
    selector     : 'v-layout',
    templateUrl  : './v-layout.component.html',
    styleUrls    : ['./v-layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VlLayoutComponent implements OnInit, OnDestroy {
    coreConfig: any;
    navigation: any;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CoreConfigService} coreConfigService
     */
    constructor(
        private coreConfigService: CoreConfigService
    ) {
        // Set the defaults
        this.navigation = navigation;

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
        // Subscribe to config changes
        this.coreConfigService.config
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((config) => {
                this.coreConfig = config;
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
