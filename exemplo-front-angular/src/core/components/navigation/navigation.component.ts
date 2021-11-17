import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {CoreNavigationService} from './navigation.service';


@Component({
    selector     : 'core-navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CoreNavigationComponent implements OnInit
{
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private coreNavigationService: CoreNavigationService
    )
    {
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
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this.coreNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this.coreNavigationService.onNavigationChanged
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(() => {
                this.navigation = this.coreNavigationService.getCurrentNavigation();
            });
    }
}
