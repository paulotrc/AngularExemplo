import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {CoreConfigService} from '../../services/config.service';


@Component({
    selector   : 'core-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls  : ['./search-bar.component.scss']
})
export class CoreSearchBarComponent implements OnInit, OnDestroy
{
    collapsed: boolean;
    coreConfig: any;

    @Output()
    input: EventEmitter<any>;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CoreConfigService} coreConfigService
     */
    constructor(
        private coreConfigService: CoreConfigService
    )
    {
        // Set the defaults
        this.input = new EventEmitter();
        this.collapsed = true;

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
        // Subscribe to config changes
        this.coreConfigService.config
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(
                (config) => {
                    this.coreConfig = config;
                }
            );
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

    /**
     * Collapse
     */
    collapse(): void
    {
        this.collapsed = true;
    }

    /**
     * Expand
     */
    expand(): void
    {
        this.collapsed = false;
    }

    /**
     * Search
     *
     * @param event
     */
    search(event): void
    {
        this.input.emit(event.target.value);
    }

}
