import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBase} from '@form';
import {CpfValidator} from '../../../../../../../core/validators/CpfValidator';
import {FormGroup, Validators} from '@angular/forms';
import {Cliente} from '../../../models/Cliente';
import {Atendimento} from '../../../../atendimento/models/Atendimento';


@Component({
    selector: 'siiga-form-clientes',
    templateUrl: './search-clientes.component.html',
    styleUrls: ['./search-clientes.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchClientesComponent extends FormBase implements OnInit {

    // @todo Documentar o uso desses atributos
    model: Cliente;
    ultimosAtendimentos: Atendimento[];

    ngOnInit(): void {

        // @todo Documentar o uso dessas configurações iniciais
        this.model = new Cliente({});
        this.formGroup = this.createForm();
        super.ngOnInit();

        // @todo Documentar o uso desse evento

        this.executeExternalService.next({
            module: 'atendimento',
            serviceInstanceName: 'serviceAtendimento',
            method: 'getMeusAtendimentos',
            result: ['ultimosAtendimentos']
        });

        console.log('SearchClientesComponent::: INIT');
    }


    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    // @todo Documentar o uso desse método
    // @todo cesarDraw idAtendimento teve que ser declarado pra não dá erro em CoreUtils.ts linha 1018
    createForm(): FormGroup {
        return this.formBuilder.group({
            cpfCnpj: [this.model.cpfCnpj, [Validators.required, CpfValidator.isValidCpf()]],
            idAtendimento: [this.model.idAtendimento],
        });
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

    titleExplicativo(item: string) {
        if ('AI' === item){
            return 'Atendimento Iniciado, próximo passo atualização cadastral.';
        }
        if ('CS' === item){
            return 'Contratos selecionados, próximo passo efetuar renegociação dos contratos.';
        }
        if ('DC' === item){
            return 'Atualização cadastral efetuada, próximo passo selecionar contratos.';
        }
        if ('SI' === item){
            return 'Simulação gravada, recuperar simulação para renegociar o contrato';
        }
        if ('AC' === item){
            return 'Atendimento concluído para a renegociação.';
        }
    }

    isCPF(): boolean {
        return this.model.cpfCnpj == null ? true : this.model.cpfCnpj.length < 12 ? true : false;
    }

    getCpfCnpjMask(): string {
        return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
    }
    
}
