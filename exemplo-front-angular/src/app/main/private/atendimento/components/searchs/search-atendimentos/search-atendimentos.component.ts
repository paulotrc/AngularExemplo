import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {coreAnimations} from 'core/animations';
import {CoreUtils} from '../../../../../../../core/utils/CoreUtils';
import {Type} from '../../../../../../common/interfaces';
import {FormAtendimentosComponent} from '../../forms/form-atendimentos/form-atendimentos.component';
import {FormBase} from '@form';
import {Atendimento} from '../../../models/Atendimento';
import {CpfValidator} from '../../../../../../../core/validators/CpfValidator';

@Component({
    selector: 'siiga-form-search-atendimentos',
    templateUrl: './search-atendimentos.component.html',
    styleUrls: ['./search-atendimentos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: coreAnimations
})
export class SearchAtendimentosComponent extends FormBase implements OnInit {

    model: Atendimento;
    // searchInput: FormControl;
    formComponent: Type<FormAtendimentosComponent> = FormAtendimentosComponent;

    menuActions: any[] = [
        // { onClick: 'openModal', icon: 'visibility', label: 'Detalhar' },
        { onClick: 'redirect', icon: 'assignment_turned_in', label: 'Continuar Atendimento' }
    ];

    dynamicColumns: any[] = [
        { prop: 'cpfCnpj', pipe : 'cpf' },
        { prop: 'nomeCliente' },
        { prop: 'situacaoBoleto' },
        { prop: 'data', pipe : 'datetime' },
        { prop: 'estadoAtualAtendimento', pipe : 'status-atendimento' },

    ];


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {

        super.ngOnInit();
        this.model = this.model || new Atendimento({});
        this.formGroup = this.createForm();
    }

    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {
        return this.formBuilder.group({
            cpfCnpj: [this.model.cpfCnpj, [Validators.required, CpfValidator.isValidCpf()]],
        });
    }

    public getAtendimentosByCpfCnpj(): void {
        let cpfCnpj = this.formGroup.value.cpfCnpj;

        let obj = {
            result: 'meusAtendimentos',
            cpfCnpj
        };

        // chama o m�todo getAtendimentosByCpfCnpj na model.service de Atendimento
        this.getAtendimentosByCpfCnpj();
        // ??
    }



    newModel() {
        CoreUtils.openRegisterFormInModal(this, {}, FormAtendimentosComponent,
            'Tem certeza de que deseja cancelar o cadastro?', 'Create', 'new', 'Cadastro de Exemplo');
    }

    redirecionaAtendimento(item: any) {
        this.sendDataOperationByState(item);
    }

    // @todo Documentar o uso desse método
    sendDataOperationByState(item: Atendimento) {
        this.storage.store('idAtendimento', item.id );
        this.storage.store('currentClient', {nome: item.nomeCliente, cpfCnpj: item.cpfCnpj});
        let config = this.storage.retrieve('rotas-por-estado');
        config = config[item.estadoAtualAtendimento];

        this.configResourceValue(config,item);

        // config.resourceValue = item.cpfCnpj;
        // config.extraParams = item; // clienteSelecionado
        this.sendDynamicDataOperation(config);
    }

    private configResourceValue(config, item){
        this.formGroup = undefined;//necessário para aplicação não tentar buscar dados no formGroup a partir dos cards.
        if ('AI' === item.estadoAtualAtendimento){
            config.resourceValue = item.cpfCnpj;
            return;
        }
        if ('AC' === item.estadoAtualAtendimento){
            config.resourceValue = item.id;
            return;
        }
        if ('CS' === item.estadoAtualAtendimento){
            config.resourceValue = item.id;
            return;
        }

        if ('DC' === item.estadoAtualAtendimento){
            config.resourceValue = item.cpfCnpj;
            return;
        }

        if ('SI' === item.estadoAtualAtendimento){
            config.resourceValue = item.id;
            return;
        }
    }

    retornar() {
        this.router.navigate(['/cliente/search-clientes']);

    }
}
