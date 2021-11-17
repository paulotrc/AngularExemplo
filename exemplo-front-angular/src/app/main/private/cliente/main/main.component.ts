import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {MainCore} from '../../../../../core/MainCore';
import {coreAnimations} from 'core/animations';
import {ModelService} from '../services/model.service';
import {locale as navigationPortuguese} from 'app/navigation/i18n/pt-br';
import {ActivatedRoute, ChildActivationEnd, NavigationEnd, Router} from '@angular/router';
import {buffer, filter, map, takeUntil, tap} from 'rxjs/operators';


@Component({
  selector: 'cliente-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: coreAnimations
})
export class MainComponent extends MainCore implements OnInit, OnDestroy {

  constructor( public modelService: ModelService, activatedRoute: ActivatedRoute, router: Router, protected changeDetector: ChangeDetectorRef ) {
    super(modelService, activatedRoute,  router, [ navigationPortuguese ], changeDetector);
  }

  ngOnInit(): void {
    super.ngOnInit();
/*
    const routeEndEvent$ = this.router.events
        .pipe(
            filter(e => e instanceof NavigationEnd),
            tap(() => console.warn('END::::::::::::::::::')),
        );

    this.router.events
        .pipe(
            filter(e => e instanceof ChildActivationEnd),
            buffer(routeEndEvent$),
            map(([ev]) => (ev as ChildActivationEnd).snapshot.firstChild.data),
            takeUntil(this.unsubscribeAll)
        )
        .subscribe(childRoute => {
          console.log('childRoute', childRoute);
        });*/
  }

}
