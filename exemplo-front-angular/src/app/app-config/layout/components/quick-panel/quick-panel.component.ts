import {Component, ViewEncapsulation} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from "@angular/router";
import {AuthenticationService} from "@services";

@Component({
    selector     : 'quick-panel',
    templateUrl  : './quick-panel.component.html',
    styleUrls    : ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent {

    date: Date;
    events: any[];
    notes: any[];
    settings: any;
    private pPlayJingle: boolean;
    private pDebug: boolean;
    private pUseFakeBackend: boolean;

    /**
     * Constructor
     */
    constructor(
        public storage: LocalStorageService,
        private router: Router,
        private authenticationService: AuthenticationService) {
        // Set the defaults
        this.date = new Date();
        this.settings = {
            notify: true,
            playJingle : false,
            debugg : false,
            useFakeBackend : false,
            retro : true
        };

        this.playJingle =  this.storage.retrieve('playJingle') === 1;
        this.debugg  =  this.storage.retrieve('debugg') === 1;
        this.useFakeBackend  =  this.storage.retrieve('useFakeBackend') === 1;
    }

    get playJingle(): boolean {
        return this.pPlayJingle;
    }

    set playJingle(value: boolean) {
        this.settings.playJingle = value;
        this.pPlayJingle = value;
        this.storage.store('playJingle', this.pPlayJingle ?  1  : 0 );
        if ( this.pPlayJingle ) {
            const strPlay = 'play';
            document.getElementById('audioPlay')[strPlay]();
        }
    }


    get debugg(): boolean {
        return this.pDebug;
    }

    set debugg(value: boolean) {
        this.settings.debugg = value;
        this.pDebug = value;
        this.storage.store('debugg', this.pDebug ?  1  : 0 );
    }


    get useFakeBackend(): boolean {
        return this.pUseFakeBackend;
    }

    set useFakeBackend(value: boolean) {
        this.settings.useFakeBackend = value;
        this.pUseFakeBackend = value;
/*        this.storage.store('useFakeBackend', this.pUseFakeBackend ?  1  : 0 );
        this.authenticationService.logout();
        this.router.navigate(['/login']);*/
    }


}
