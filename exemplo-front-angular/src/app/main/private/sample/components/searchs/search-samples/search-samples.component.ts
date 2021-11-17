import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {coreAnimations} from 'core/animations';
import {ModelService} from '../../../services/model.service';

import {locale as navigationEnglish} from '../../../../../../navigation/i18n/en';
import {locale as navigationPortuguese} from '../../../../../../navigation/i18n/pt-br';
import {CoreTranslationLoaderService} from '../../../../../../../core/services/translation-loader.service';
import {TranslateService} from '@ngx-translate/core';
import {CoreUtils} from '../../../../../../../core/utils/CoreUtils';
import {Type} from '../../../../../../common/interfaces';
import {FormSamplesComponent} from '../../forms/form-samples/form-samples.component';
import {FormBase} from '@form';

@Component({
  selector: 'siiga-form-search-samples',
  templateUrl: './search-samples.component.html',
  styleUrls: ['./search-samples.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : coreAnimations
})
export class SearchSamplesComponent extends FormBase implements OnInit {

  searchInput: FormControl;
  formComponent: Type<FormSamplesComponent> = FormSamplesComponent;

    dynamicColumns: any[] = [
    {prop: 'name', name: 'Name'},
    {
        prop: 'alias', name: 'Alias',
        merge:
        {
          columns: ['status', 'starred'],
          separator: ' - '
        }
    },
    {prop: 'creationDate', name: 'Creation Date', pipe: 'date'},
    {prop: 'price', name: 'Price', pipe: 'currency'}
  ];


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  ngOnInit(): void {
  CoreUtils.onCloseModal(this);
  CoreUtils.onSelectedModelsChanged(this);
  CoreUtils.closeModalOnRequestOperation(this);
  CoreUtils.onSearchInputChanged(this, [
    {name: 'ano', elementId: 'searchYear'},
    {name: 'titulo', elementId: 'searchName'}
  ]);
  this.resourcePathAPI = 'sample';
  this.serviceName = 'sample';

  super.ngOnInit();
}



  newModel() {
    CoreUtils.openRegisterFormInModal( this, {}, FormSamplesComponent ,
        'Tem certeza de que deseja cancelar o cadastro?', 'Create', 'new', 'Cadastro de Exemplo');
  }

}
