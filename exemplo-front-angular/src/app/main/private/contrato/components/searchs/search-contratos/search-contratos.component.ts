import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {coreAnimations} from 'core/animations';
import {CoreUtils} from '../../../../../../../core/utils/CoreUtils';
import {Type} from '../../../../../../common/interfaces';
import {FormBase} from '../../../../../../common/forms';
import {DetailContratosComponent} from '../../details/detail-contratos/detail-contratos.component';
import {Contrato} from '../../../models/contrato';

@Component({
    selector: 'siiga-form-contratos',
    templateUrl: './search-contratos.component.html',
    styleUrls: ['./search-contratos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: coreAnimations
})
export class SearchContratosComponent extends FormBase  implements OnInit, OnDestroy {

    model: Contrato;

    searchInput: FormControl;

    formComponent: Type<DetailContratosComponent> = DetailContratosComponent;

    menuActions: any[] = [
        { onClick: 'openModal', icon: 'visibility', label: 'Visualizar' }
    ];



    dynamicColumns: any[] = [
        { prop: 'numeroDoContrato', name: 'Número do Contrato'},
        {
            prop: 'codigoDescricaoProduto', name: 'Operação / Produto',
            merge:
                {
                    columns: ['produtoCodigo', 'produtoDescricao'],
                    separator: ' / '
                }
        },
        { prop: 'valorDividaTotal', pipe : 'currency'},
        {
            prop: 'statusPrazo', name: 'Status / Prazo',
            merge:
                {
                    columns: ['status', 'prazo'],
                    separator: ' / ',
                    pipe: ['status', 'prazoEmDias']
                }
        }
    ];

    ngOnInit(): void {
        super.ngOnInit();
        this.model = this.model || new Contrato({});
        if(this.listModels != undefined && this.selectedModels != undefined && this.modelService.selectedModels != undefined){
            if(this.listModels.length < this.selectedModels.length ){
                this.selectedModels = [];
            }
        }
    }

    objConfigRenegociacao(ṕExtraParams) {
        const obj = {
            action: 'create',
            state: 'edit',
            module: 'renegociacao',
            serviceName: 'renegociacoes',
            resourcePathAPI: 'renegociacoes-resumo',
            returnUrl: 'renegociacoes/renegociacao',
            resourceValue: this.storage.retrieve('idAtendimento' ),
            extraParams: ṕExtraParams,
            dataToSend: this.prepareModelToRenegociation(this.storage.retrieve('idAtendimento' ))
        };
        return obj;
    }

    private prepareModelToRenegociation(idAtendimento) {
        var obj = {
            id: idAtendimento,
            idAtendimento,
            listaDeContrato: this.selectedModels,
            dadosPagamento: null
        };

        return obj;


        
    }

    openContrato() {
            CoreUtils.openRegisterFormInModal(this, {}, DetailContratosComponent,
            'Tem certeza de que deseja cancelar o cadastro?', 'Create', 'new', 'Cadastro de Exemplo');
    }
}
