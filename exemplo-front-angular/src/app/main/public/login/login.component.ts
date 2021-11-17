import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {CoreConfigService} from 'core/services/config.service';
import {coreAnimations} from 'core/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';



import {locale as portuguese} from './i18n/pt-br';
import {AlertService, AuthenticationService} from '@services';
import {CoreTranslationLoaderService} from '../../../../core/services/translation-loader.service';


@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : coreAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    /**
     * Constructor
     *
     * @param {CoreConfigService} coreConfigService
     * @param {FormBuilder} formBuilder
     * @param route
     * @param router
     * @param authenticationService
     * @param alertService
     */
    constructor(
        private coreConfigService: CoreConfigService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private coreTranslationLoaderService: CoreTranslationLoaderService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            // this.router.navigate(['/']);
        }

        this.coreTranslationLoaderService.loadTranslations(portuguese);

        // Configure the layout
        this.coreConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username   : ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
        console.info('LOGIN URL::: his.returnUrl ', this.route.snapshot);
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.info('Erro ao logar ::::', error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
