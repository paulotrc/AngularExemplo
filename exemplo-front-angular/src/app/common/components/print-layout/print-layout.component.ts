import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MainCore} from '../../../../core/MainCore';
import {ModelService} from '../../../main/private/sample/services/model.service';
import {ActivatedRoute, Router} from '@angular/router';
import {locale as navigationPortuguese} from '../../../navigation/i18n/pt-br';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss']
})
export class PrintLayoutComponent extends MainCore implements OnInit {

  constructor(public modelService: ModelService, activatedRoute: ActivatedRoute, router: Router,
              protected changeDetector: ChangeDetectorRef) {
    super(modelService, activatedRoute, router, [navigationPortuguese], changeDetector);


  }
}
