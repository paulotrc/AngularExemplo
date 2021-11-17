import {
    AfterContentChecked,
    ChangeDetectorRef,
    ComponentFactoryResolver,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CoreConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {CoreSidebarService} from './components/sidebar/sidebar.service';
import {CoreTranslationLoaderService, Locale} from './services/translation-loader.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {CoreSplashScreenService} from './services/splash-screen.service';
import {CoreAppInjector} from './CoreAppInjector';
import {CoreUtils} from './utils/CoreUtils';
import {CoreConfigService} from './services/config.service';
import {BaseService} from '@services';

export class MainCore implements OnInit, OnDestroy, AfterContentChecked {

    dialogRef: any;
    @ViewChild('loadComponent', {read: ViewContainerRef}) entry: ViewContainerRef;
    confirmDialogRef: MatDialogRef<CoreConfirmDialogComponent>;
    hasSelectedItens: boolean;
    public formLoaded = false;
    public showSubTitle = false;

    searchInput: FormControl;
    // Private
    protected unsubscribeAll: Subject<any>;
    protected currentPath: string;
    protected componentRef: any;

    protected coreSidebarService: CoreSidebarService;
    protected matDialog: MatDialog;
    protected coreTranslationLoaderService: CoreTranslationLoaderService;
    protected translateService: TranslateService;
    protected resolver: ComponentFactoryResolver;
    protected splashScreenService: CoreSplashScreenService;
    protected coreConfigService: CoreConfigService;

    private currentResourcePathAPI: string;


    constructor(
        public modelService: BaseService,
        public activatedRoute: ActivatedRoute,
        public router: Router,
        protected translations: Locale[],
        protected changeDetector: ChangeDetectorRef
    ) {
        const injector = CoreAppInjector.getInjector();
        this.matDialog = injector.get(MatDialog);
        this.translateService = injector.get(TranslateService);
        this.resolver = injector.get(ComponentFactoryResolver);
        this.coreSidebarService = injector.get(CoreSidebarService);
        this.splashScreenService = injector.get(CoreSplashScreenService);
        this.coreTranslationLoaderService = injector.get(CoreTranslationLoaderService);
        this.coreConfigService = injector.get(CoreConfigService);

        CoreUtils.onCloseModal(this);


        let module: string;
        let defaultPath: string;
        let rootPath: string;
        let url: any;

        console.log('MAIN_ROUTER_SNAPSHOT', this.activatedRoute.snapshot);
        console.log('MAIN_ROUTER_SNAPSHOT', this.activatedRoute.snapshot);

        this.activatedRoute.url.subscribe(pUrl => {
            console.log('PURL:: ', pUrl);
            url = pUrl;
        });
        /*this.activatedRoute.data.subscribe(dataConfig => {*/
        module = this.activatedRoute.routeConfig.data.module;
        // defaultPath         = this.activatedRoute.data.defaultPath;
        rootPath = this.router.url.split('/')[1];


        const urlParts = this.router.url.split('/');
        this.currentPath = urlParts[urlParts.length - 1];

        console.log('MAIN_ROUTER', this.router);
        console.log('MAIN_URL_ROUTER', this.router.url);
        console.log('MAIN_MODULE_ROUTER_ROOT_PATH', rootPath);
        console.log('MAIN_ACTIVATED_ROUTE', this.activatedRoute);
        console.log('MAIN_ACTIVATED_ROUTE_CHILDREN', this.activatedRoute.routeConfig);

        console.log('MAIN_ACTIVATED_ROUTE_URL_PATH', this.activatedRoute.routeConfig.path);
        console.log('MAIN_ACTIVATED_ROUTE_URL_PARTS', urlParts);
        console.log('MAIN_ACTIVATED_ROUTE_CURRENT_PATH', this.currentPath);
        console.log('MAIN_ACTIVATED_ROUTE_MODULE', module);

        // const pathToLoad = rootPath === this.currentPath && defaultPath ? defaultPath : this.currentPath;

        if (this.activatedRoute.routeConfig?.data !== undefined) {
            /*const child: any = this.activatedRoute.routeConfig.children.filter(childrenItem => {
                console.log('MAIN_ACTIVATED_ROUTE_CHILD', childrenItem.path, pathToLoad);
                return childrenItem.path === pathToLoad;
            })[0];*/

            // console.log('MAIN_ACTIVATED_ROUTE_CHILD', child);

            /* if (child !== undefined) {*/
            this.currentPath = this.activatedRoute.routeConfig.path;
            this.currentPath = this.activatedRoute.routeConfig.path;
            this.translateService.addLangs(this.activatedRoute.routeConfig.data.languages);

            // Set the default language
            this.translateService.setDefaultLang(this.activatedRoute.routeConfig.data.defaultLanguage);

            // Set the navigation translations
            // @ts-ignore
            this.coreTranslationLoaderService.loadTranslations(translations);
            this.modelService.serviceName = this.activatedRoute.routeConfig.data.serviceName;
            this.modelService.moduleName = this.activatedRoute.routeConfig.data.module;
            this.modelService.currentResourcePathAPI = this.activatedRoute.routeConfig.data.resourcePathAPI;
            /*  }*/
        }

        this.modelService.externalServices = [];

        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this.unsubscribeAll = new Subject();
        CoreUtils.onRequestOperation(this);
        CoreUtils.dynamicRedirect(this);
    }




    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    ngOnInit(): void {

    }

    destroyComponent() {
        this.componentRef.destroy();
    }

    ngAfterContentChecked() {
        this.changeDetector.detectChanges();
    }


}
