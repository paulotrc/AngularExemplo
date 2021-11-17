import { Component, HostBinding, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {coreAnimations} from '../../animations';
import {CoreConfigService} from '../../services/config.service';
import {CoreSidebarService} from '../sidebar/sidebar.service';

@Component({
    selector     : 'core-theme-options',
    templateUrl  : './theme-options.component.html',
    styleUrls    : ['./theme-options.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : coreAnimations
})
export class CoreThemeOptionsComponent implements OnInit, OnDestroy {
    coreConfig: any;
    form: FormGroup;

    @HostBinding('class.bar-closed')
    barClosed: boolean;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FormBuilder} formBuilder
     * @param {CoreConfigService} coreConfigService
     * @param {CoreNavigationService} coreNavigationService
     * @param {CoreSidebarService} coreSidebarService
     * @param {Renderer2} renderer
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private formBuilder: FormBuilder,
        private coreConfigService: CoreConfigService,
        private coreSidebarService: CoreSidebarService,
        private renderer: Renderer2
    ) {
        // Set the defaults
        this.barClosed = true;

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
        // Build the config form
        // noinspection TypeScriptValidateTypes
        this.form = this.formBuilder.group({
            colorTheme      : new FormControl(),
            customScrollbars: new FormControl(),
            layout          : this.formBuilder.group({
                style    : new FormControl(),
                width    : new FormControl(),
                navbar   : this.formBuilder.group({
                    primaryBackground  : new FormControl(),
                    secondaryBackground: new FormControl(),
                    folded             : new FormControl(),
                    hidden             : new FormControl(),
                    position           : new FormControl(),
                    variant            : new FormControl()
                }),
                toolbar  : this.formBuilder.group({
                    background           : new FormControl(),
                    customBackgroundColor: new FormControl(),
                    hidden               : new FormControl(),
                    position             : new FormControl()
                }),
                footer   : this.formBuilder.group({
                    background           : new FormControl(),
                    customBackgroundColor: new FormControl(),
                    hidden               : new FormControl(),
                    position             : new FormControl()
                }),
                sidepanel: this.formBuilder.group({
                    hidden  : new FormControl(),
                    position: new FormControl()
                })
            })
        });

        // Subscribe to the config changes
        this.coreConfigService.config
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((config) => {

                // Update the stored config
                this.coreConfig = config;

                // Set the config form values without emitting an event
                // so that we don't end up with an infinite loop
                this.form.setValue(config, {emitEvent: false});
            });

        // Subscribe to the specific form value changes (layout.style)
        this.form.get('layout.style').valueChanges
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((value) => {

                // Reset the form values based on the
                // selected layout style
                this._resetFormValues(value);

            });

        // Subscribe to the form value changes
        this.form.valueChanges
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((config) => {

                // Update the config
                this.coreConfigService.config = config;
            });

        // Add customize nav item that opens the bar programmatically
        const customFunctionNavItem = {
            id      : 'custom-function',
            title   : 'Custom Function',
            type    : 'group',
            icon    : 'settings',
            children: [
                {
                    id      : 'customize',
                    title   : 'Customize',
                    type    : 'item',
                    icon    : 'settings',
                    function: () => {
                        this.toggleSidebarOpen('themeOptionsPanel');
                    }
                }
            ]
        };

        // this.coreNavigationService.addNavigationItem(customFunctionNavItem, 'end');
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();

        // Remove the custom function menu
        // this.coreNavigationService.removeNavigationItem('custom-function');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset the form values based on the
     * selected layout style
     *
     * @param value
     * @private
     */
    private _resetFormValues(value): void {
        switch ( value ) {
            // Vertical Layout #3
            case 'v-layout': {
                this.form.patchValue({
                    layout: {
                        width    : 'fullwidth',
                        navbar   : {
                            primaryBackground  : 'core-blue-700',
                            secondaryBackground: 'core-blue-900',
                            folded             : false,
                            hidden             : false,
                            position           : 'left',
                            layout             : 'vertical-style-1'
                        },
                        toolbar  : {
                            background           : 'core-white-500',
                            customBackgroundColor: false,
                            hidden               : false,
                            position             : 'above-static'
                        },
                        footer   : {
                            background           : 'core-navy-900',
                            customBackgroundColor: true,
                            hidden               : false,
                            position             : 'above-static'
                        },
                        sidepanel: {
                            hidden  : false,
                            position: 'right'
                        }
                    }
                });

                break;
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this.coreSidebarService.getSidebar(key).toggleOpen();
    }
}
