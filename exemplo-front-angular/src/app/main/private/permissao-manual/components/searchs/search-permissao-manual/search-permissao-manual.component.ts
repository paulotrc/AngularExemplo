import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBase } from '../../../../../../common/forms';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { PermissaoManual } from '../../../models/PermissaoManual';
import { CoreUtils } from '../../../../../../../core/utils/CoreUtils';
import {Type} from '../../../../../../common/interfaces';
import { DetailContratosComponent } from
    "app/main/private/contrato/components/details/detail-contratos/detail-contratos.component";


@Component({
  selector: 'siiga-search-permissao-manual',
  templateUrl: './search-permissao-manual.component.html',
    styleUrls: ['./search-permissao-manual.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CoreUtils.subformComponentProviders(PermissaoManual)]
})
export class SearchPermissaoManualComponent extends FormBase implements OnInit {

    options: FormGroup;

    searchInput: FormControl;

    formComponent: Type<DetailContratosComponent> = DetailContratosComponent;

    menuActions: any[] = [
        { onClick: 'openModal', icon: 'visibility', label: 'Visualizar' }
    ];

    dynamicColumns: any[] = [
        { prop: 'PermissaoManual' }
        
        
    ];

    displayedColumns: string[] = ['index', 'permissao'];
    data: string[] = ['IGA02 - USUARIO REDE SR', 'IGA01 - CONSULTA', 'IGA012 - CONCILIACAO', 'IGA10 - ADMINISTRADOR', 'IGA03 - USUARIO REDE PV'];
    
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  ngOnInit(): void {
      super.ngOnInit();
      this.model = this.model || new PermissaoManual({});
      this.formGroup = this.createForm();
    }
  /**
     * Create model form
     *
     * @returns {FormGroup}
     */
  createForm(): FormGroup {

      return this.formBuilder.group({
          nome: this.model.nome,
          cpfCnpj: this.model.cpfCnpj,
          idAtendimento: this.storage.retrieve('idAtendimento'),
          floatLabel: 'auto'
      });
  }
  incluir() {
      this.router.navigate(['/permissao-manual/form-permissao-manual']); 
  }

 
}
