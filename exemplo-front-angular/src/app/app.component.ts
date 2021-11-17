import {AfterViewInit, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DOCUMENT, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {navigation} from './navigation/navigation';
import {locale as navigationEnglish} from './navigation/i18n/en';
import {locale as navigationPortuguese} from './navigation/i18n/pt-br';


import {CoreConfigService} from '../core/services/config.service';
import {CoreSidebarService} from '../core/components/sidebar/sidebar.service';
import {CoreTranslationLoaderService} from '../core/services/translation-loader.service';
import {CoreSplashScreenService} from '../core/services/splash-screen.service';
import {AuthenticationService} from './common/services';
import {Router} from '@angular/router';
import {User} from './common/models';
import {CoreNavigationService} from '../core/components/navigation/navigation.service';
import {KeycloakService} from "./common/utils/security/keycloak/keycloak.service";

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  coreConfig: any;
  currentUser: User;
  navigation: any;
  baseURL: boolean;
  renovaToken;

  /**
   * Constructor
   *
   * @param document Document
   * @param coreConfigService Config service
   * @param coreNavigationService
   * @param coreSidebarService SideBar service
   * @param coreSplashScreenService SplashScreen Service
   * @param translationLoaderService Translation Service
   * @param platform Platform
   * @param translateService Translate Service
   * @param authenticationService Auth Service
   * @param router Router
   * @param keycloakService
   * @param location Location
   */
  constructor(
    @Inject(DOCUMENT) private document: any,
    private coreConfigService: CoreConfigService,
    private coreNavigationService: CoreNavigationService,
    private coreSidebarService: CoreSidebarService,
    private coreSplashScreenService: CoreSplashScreenService,
    private translationLoaderService: CoreTranslationLoaderService,
    private translateService: TranslateService,
    private platform: Platform,
    private authenticationService: AuthenticationService,
    private router: Router,
    private keycloakService: KeycloakService,
    public location: Location
  ) {

    this.getlUserRole();

    // Get default navigation
    this.navigation = navigation;

    // Register the navigation to the service
    this.coreNavigationService.register('main', this.navigation);

    // Set the main navigation as our current navigation
    this.coreNavigationService.setCurrentNavigation('main');

    // Add languages
    this.translateService.addLangs(['en', 'pt-br']);

    // Set the default language
    this.translateService.setDefaultLang('pt-br');

    // Set the navigation translations
    this.translationLoaderService.loadTranslations(navigationEnglish, navigationPortuguese);

    // Use a language
    this.translateService.use('pt-br');

    // Add is-mobile class to the body if the platform is mobile
    if ( this.platform.ANDROID || this.platform.IOS ) {
      this.document.body.classList.add('is-mobile');
    }

    // Set the private defaults
    this.unsubscribeAll = new Subject();
    const user: User = new User({});



    // @todo revisar o currentUser
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

/*    this.router.events
      /!*.pipe(
        filter( event => event instanceof NavigationEnd)
      )*!/
      .subscribe(
        (event: NavigationEnd) => {
        console.log('EVENT:::::::: ', event);
            setTimeout(() => {
                // this.coreSplashScreenService.hide();
               /!* ##(this.document.getElementById('fly-spinner') as HTMLElement).style.display= 'none';*!/
            }, 3000);
        }
      );*/

/*    this.router.events
      .pipe(
        filter( event => event instanceof NavigationStart)
      )
      .subscribe(
        (event: NavigationEnd) => {
          // console.log('EVENT:::::::: ', event);
            // ## (this.document.getElementById('fly-spinner') as HTMLElement).style.display= '';

          // this.coreSplashScreenService.show();
        }
      );*/

  }



  // Private
  private unsubscribeAll: Subject<any>;


// -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------


    ngAfterViewInit() {
       /* (this.document.querySelector('.app-alerts') as HTMLElement).style.top = '150px';*/
        // (this.document.getElementById('fly-spinner') as HTMLElement).style.display('none');
        // ## console.log('>>>>>>>>>>>>>>>>>>>> ', (this.document.getElementById('fly-spinner') as HTMLElement).style.display= 'none');
        // (this.document.getElementById('core-splash-screenr') as HTMLElement).style.backgroundColor= '#FFF';

        // ## (this.document.getElementById('div-frame') as HTMLElement).style.display= 'none';
        // ## (this.document.getElementById('div-clouds') as HTMLElement).style.display= 'none';
        /*this.document.getElementById('logo-splash');
        this.document.getElementById('info-splash')*/
    }



  /**
   * On init
   */
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (this.location.path() !== '') {
        this.baseURL = false;
      } else {
        this.baseURL = true;
      }
    });
    // Subscribe to config changes
    this.coreConfigService.config
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((config) => {

       this.coreConfig = config;

       if ( this.coreConfig.layout.width === 'boxed' ) {
          this.document.body.classList.add('boxed');
        } else {
          this.document.body.classList.remove('boxed');
        }

        // Color theme - Use normal for loop for IE11 compatibility
       for ( const className of this.document.body.classList ) {
          if ( className.startsWith('theme-') ) {
            this.document.body.classList.remove(className);
          }
        }

       this.document.body.classList.add(this.coreConfig.colorTheme);
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
   * Toggle sidebar open
   *
   * @param key componente name
   */
  toggleSidebarOpen(key: string): void {
    this.coreSidebarService.getSidebar(key).toggleOpen();
  }

  /**Busca perfil do usuário com base nos dados do SSO */
  getlUserRole() {
    let userData: any = this.keycloakService.getUserData();
    if (userData) {
      userData = {
        nome: userData.name,
        email: userData.email,
        cpf: userData.preferred_username,
        dataNascimento: userData.dataNascimento,
        redeSocial: {
          facebook: '',
          instagram: '',
          linkedin: ''
        }
      };
      // @TODO implementar aqui chamadas específicas para o perfil do usuário.
    }
  }
}
