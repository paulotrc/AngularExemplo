import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { Router } from '@angular/router';
import {User} from '../../../../common/models';
import {CoreConfigService} from '../../../../../core/services/config.service';
import {CoreSidebarService} from '../../../../../core/components/sidebar/sidebar.service';
import {AuthenticationService} from '@services';

import { navigation } from '../../../../navigation/navigation';


@Component({
    selector     : 'core-toolbar',
    templateUrl  : './core-toolbar.component.html',
    styleUrls    : ['./core-toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CoreToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    currentUser: User;
    currentUserSubscription: Subscription;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CoreConfigService} coreConfigService
     * @param {CoreSidebarService} coreSidebarService
     * @param {TranslateService} translateService
     */
    constructor(
        private coreConfigService: CoreConfigService,
        private coreSidebarService: CoreSidebarService,
        private translateService: TranslateService,
        private router: Router,
        private authenticationService: AuthenticationService
    )
    {
        //  this.currentUser = new User({});

        //if(undefined !== this.currentUserSubscription) {
            this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
                this.currentUser = user;
            });
        //}

        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id   : 'en',
                title: 'English',
                flag : 'us'
            },
            {
                id   : 'pt-br',
                title: 'Português',
                flag : 'br'
            }
        ];

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
    ngOnInit(): void
    {
        this.coreConfigService.config
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        this.selectedLanguage = _.find(this.languages, {'id': this.translateService.currentLang});
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
        if(undefined !== this.currentUserSubscription){
            this.currentUserSubscription.unsubscribe();
        }
    }

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this.coreSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void
    {
        console.log('Buscar: ',value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void
    {
        this.selectedLanguage = lang;
        this.translateService.use(lang.id);
    }


    public logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }

}
