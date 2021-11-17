import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {CoreMatchMediaService} from '../../services/match-media.service';
import {CoreNavigationService} from '../navigation/navigation.service';


@Component({
    selector   : 'core-shortcuts',
    templateUrl: './shortcuts.component.html',
    styleUrls  : ['./shortcuts.component.scss']
})
export class CoreShortcutsComponent implements OnInit, OnDestroy {
    shortcutItems: any[];
    navigationItems: any[];
    filteredNavigationItems: any[];
    searching: boolean;
    mobileShortcutsPanelActive: boolean;

    @Input()
    navigation: any;

    @ViewChild('searchInput', {static: true})
    searchInputField;

    @ViewChild('shortcuts', {static: true})
    shortcutsEl: ElementRef;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Renderer2} _renderer
     * @param {CookieService} _cookieService
     * @param {CoreMatchMediaService} _coreMatchMediaService
     * @param {CoreNavigationService} coreNavigationService
     * @param {ObservableMedia} _observableMedia
     */
    constructor(
        private _cookieService: CookieService,
        private _coreMatchMediaService: CoreMatchMediaService,
        private coreNavigationService: CoreNavigationService,
        private _observableMedia: MediaObserver,
        private _renderer: Renderer2
    ) {
        // Set the defaults
        this.shortcutItems = [];
        this.searching = false;
        this.mobileShortcutsPanelActive = false;

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
        // Get the navigation items and flatten them
        this.filteredNavigationItems = this.navigationItems = this.coreNavigationService.getFlatNavigation(this.navigation);

        const cookieExists = this._cookieService.check('Core.shortcuts');

        if ( cookieExists ) {
            this.shortcutItems = JSON.parse(this._cookieService.get('Core.shortcuts'));
        } else {
            // User's shortcut items
            this.shortcutItems = [];
        }

        this._coreMatchMediaService.onMediaChange
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(() => {
                if ( this._observableMedia.isActive('gt-sm') ) {
                    this.hideMobileShortcutsPanel();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Search
     *
     * @param event
     */
    search(event): void {
        const value = event.target.value.toLowerCase();

        if ( value === '' ) {
            this.searching = false;
            this.filteredNavigationItems = this.navigationItems;

            return;
        }

        this.searching = true;

        this.filteredNavigationItems = this.navigationItems.filter((navigationItem) => {
            return navigationItem.title.toLowerCase().includes(value);
        });
    }

    /**
     * Toggle shortcut
     *
     * @param event
     * @param itemToToggle
     */
    toggleShortcut(event, itemToToggle): void {
        event.stopPropagation();

        for ( let i = 0; i < this.shortcutItems.length; i++ ) {
            if ( this.shortcutItems[i].url === itemToToggle.url ) {
                this.shortcutItems.splice(i, 1);

                // Save to the cookies
                this._cookieService.set('Core.shortcuts', JSON.stringify(this.shortcutItems));

                return;
            }
        }

        this.shortcutItems.push(itemToToggle);

        // Save to the cookies
        this._cookieService.set('Core.shortcuts', JSON.stringify(this.shortcutItems));
    }

    /**
     * Is in shortcuts?
     *
     * @param navigationItem
     * @returns {any}
     */
    isInShortcuts(navigationItem): any {
        return this.shortcutItems.find(item => {
            return item.url === navigationItem.url;
        });
    }

    /**
     * On menu open
     */
    onMenuOpen(): void {
        setTimeout(() => {
            this.searchInputField.nativeElement.focus();
        });
    }

    /**
     * Show mobile shortcuts
     */
    showMobileShortcutsPanel(): void {
        this.mobileShortcutsPanelActive = true;
        this._renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }

    /**
     * Hide mobile shortcuts
     */
    hideMobileShortcutsPanel(): void {
        this.mobileShortcutsPanelActive = false;
        this._renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }
}
