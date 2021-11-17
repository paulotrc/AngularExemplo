import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {coreAnimations} from 'core/animations';
import {CoreUtils} from '../../../../../../../core/utils/CoreUtils';
import {Type} from '../../../../../../common/interfaces';
import {FormGruposComponent} from '../../forms/form-grupos/form-grupos.component';
import {FormBase} from '@form';
import { Grupo } from '../../../models/Grupo';

@Component({
  selector: 'siiga-form-search-grupos',
  templateUrl: './search-grupos.component.html',
  styleUrls: ['./search-grupos.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : coreAnimations
})
export class SearchGruposComponent extends FormBase implements OnInit {

    model: Grupo;

    searchInput: FormControl;

    formComponent: Type<FormGruposComponent> = FormGruposComponent;

    menuActions: any[] = [
        { onClick: 'openModal', icon: 'visibility', label: 'Visualizar' }
    ];

    dynamicColumns: any[] = [
        { prop: 'Código do Grupo'},
        { prop: 'Descrição'}
  ];


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  ngOnInit(): void {
      super.ngOnInit();
      this.model = this.model || new Grupo({});
    }

  newModel() {
    CoreUtils.openRegisterFormInModal( this, {}, FormGruposComponent ,
        'Tem certeza de que deseja cancelar o cadastro?', 'Create', 'new', 'Cadastro de Exemplo');
  }

}
