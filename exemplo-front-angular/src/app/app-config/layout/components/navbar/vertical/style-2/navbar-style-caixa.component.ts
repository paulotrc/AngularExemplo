import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';
import {CorePerfectScrollbarDirective} from '../../../../../../../core/directives/core-perfect-scrollbar/core-perfect-scrollbar.directive';
import {CoreConfigService} from '../../../../../../../core/services/config.service';
import {CoreSidebarService} from '../../../../../../../core/components/sidebar/sidebar.service';
import {CoreNavigationService} from '../../../../../../../core/components/navigation/navigation.service';



@Component({
    selector     : 'navbar-vertical-style-caixa',
    templateUrl  : './navbar-style-caixa.component.html',
    styleUrls    : ['./navbar-style-caixa.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyleCaixaComponent implements OnInit, OnDestroy {
    coreConfig: any;
    navigation: any;

    // Private
    private corePerfectScrollbar: CorePerfectScrollbarDirective;
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CoreConfigService} coreConfigService
     * @param {CoreNavigationService} coreNavigationService
     * @param {CoreSidebarService} coreSidebarService
     * @param {Router} router
     */
    constructor(
        private coreConfigService: CoreConfigService,
        private coreNavigationService: CoreNavigationService,
        private coreSidebarService: CoreSidebarService,
        private router: Router
    ) {
        // Set the private defaults
        this.unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(CorePerfectScrollbarDirective, {static: true})
    set directive(theDirective: CorePerfectScrollbarDirective) {
        if ( !theDirective ) {
            return;
        }

        this.corePerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this.coreNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this.unsubscribeAll)
            )
            .subscribe(() => {
                this.corePerfectScrollbar.update();
            });

        // Scroll to the active item position
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                    setTimeout(() => {
                        const activeNavItem: any = document.querySelector('navbar .nav-link.active');

                        if ( activeNavItem ) {
                            const activeItemOffsetTop       = activeNavItem.offsetTop,
                                  activeItemOffsetParentTop = (null == activeNavItem.offsetParent) ?
                                      activeItemOffsetTop : activeNavItem.offsetParent.offsetTop,
                                  scrollDistance            = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3);

                            this.corePerfectScrollbar.scrollToTop(scrollDistance);
                        }
                    });
                }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this.unsubscribeAll)
            )
            .subscribe(() => {
                    if ( this.coreSidebarService.getSidebar('navbar') ) {
                        this.coreSidebarService.getSidebar('navbar').close();
                    }
                }
            );

        // Get current navigation
        this.coreNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this.unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this.coreNavigationService.getCurrentNavigation();
            });

        // Subscribe to the config changes
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        this.coreSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        this.coreSidebarService.getSidebar('navbar').toggleFold();
    }
}
