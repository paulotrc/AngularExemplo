import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {coreAnimations} from 'core/animations';
import {ModelService} from '../services/model.service';


import {locale as navigationPortuguese} from 'app/navigation/i18n/pt-br';

import {ActivatedRoute, Router} from '@angular/router';
import {MainCore} from '../../../../../core/MainCore';


@Component({
  selector: 'contrato-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: coreAnimations
})
export class MainComponent extends MainCore implements OnInit, OnDestroy {

  constructor( public modelService: ModelService, activatedRoute: ActivatedRoute, router: Router, protected changeDetector: ChangeDetectorRef ) {
    super(modelService, activatedRoute,  router, [ navigationPortuguese ], changeDetector);
  }

}
