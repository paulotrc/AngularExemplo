import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {FormBase} from '../../../../../../common/forms';
import {FormGroup} from '@angular/forms';
import {SituacaoEspecial} from '../../../models/SituacaoEspecial';
import {CoreUtils} from '../../../../../../../core/utils/CoreUtils';
import {Grupo} from "../../../../grupo/models/Grupo";
import {Type} from '../../../../../../common/interfaces';
import {locale as portuguese} from '../../../i18n/pt-br';
import {MatDialog} from "@angular/material/dialog";
import {DetailSituacaoEspecialComponent} from "../../details/detail-situacao-especial/detail-situacao-especial.component";
import {DeleteSituacaoEspecialComponent} from "../../deletes/delete-situacao-especial/delete-situacao-especial.component";


@Component({
  selector: 'siiga-form-search-situacao-especial',
  templateUrl: './search-situacao-especial.component.html',
  styleUrls: ['./search-situacao-especial.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [CoreUtils.subformComponentProviders(SituacaoEspecial)]
})


export class SearchSituacaoEspecialComponent extends FormBase implements OnInit {

    tipoConsultaGrupo: boolean;
    todosGrupos: Grupo[];
    grupoSelecionadoTitulo: Grupo;
    impedimentos: any[] = [];
    formComponent: Type<DetailSituacaoEspecialComponent> = DetailSituacaoEspecialComponent;

    model: SituacaoEspecial;

    menuActions: any[] = [
        { onClick: 'openModal', icon: 'visibility', label: 'Visualizar Permissão Manual'},
        { onClick: 'openExtraModal', icon: 'cancel', label: 'Excluir Situação Especial'},
        { onClick: 'redirect', icon: 'assignment_turned_in', label: 'Incluir Permissão Manual' }
    ];

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
    constructor(public dialog: MatDialog) {
        super({});
    }

  ngOnInit(): void {
      super.ngOnInit();
      this.model = this.model || new SituacaoEspecial({});
      this.formGroup = this.createForm();

      this.coreTranslationLoaderService.loadTranslations(portuguese);

      this.executeExternalService.next({
          module: 'grupo',
          serviceInstanceName: 'serviceGrupo',
          method: 'getGrupos',
          result: ['todosGrupos']
      });
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.modelService.getColumnsImpedimentos(['impedimentos']);
    }

    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
  createForm(): FormGroup {

      return this.formBuilder.group({
          opcaoGrupo : 0,
          grupoSelecionado: 0,
          idSituacao: 0
      });
  }
  incluir() {
      this.router.navigate(['/situacao-especial/form-situacao-especial']); //  @todo Revisar: remover caso seja lixo.
  }

    pesquisar(obj:any) {
        this.todosGrupos.forEach(item =>{
            if(item.id === this.formGroup.get('grupoSelecionado').value){
                this.grupoSelecionadoTitulo = item;
            }
        });
        this.updateDataProvider(null, 'situacoes-especiais?grupoSelecionado='+this.formGroup.get('grupoSelecionado').value+'&pageSize=10');
    }

    redirecionaInclusaoPermissaoManual(objEvent: any) {
        this.formGroup.value.idSituacao = objEvent.id;
        this.storage.store('idSituacao', objEvent.id);
        this.sendDataOperation('get', 'situacoes-especiais', 'situacao-especial', 'situacao-especial/form-situacao-especial-inclusao-manual', objEvent.id, 'situacoes-especiais', objEvent.id, 'edit');
    }

    openModalExcluirSituacaoEspecial(objEvent: any){
        objEvent.grupoDescricao = this.grupoSelecionadoTitulo.descricao;
        objEvent.excluido = '';
        objEvent.dataExclusao = '';
        CoreUtils.openRegisterFormInModal(this,
            objEvent, DeleteSituacaoEspecialComponent,
            'Tem certeza de que deseja excluir?',
            'delete', 'view', 'Excluir Situação Especial');
        this.dialogRef.afterClosed()
            .subscribe((objEvent) => {
               this.pesquisar('');
            });
    }

}
