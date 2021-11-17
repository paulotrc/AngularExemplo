import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {FormBase} from '../../../../../../common/forms';
import {ResumoAtendimentoRenegociacaoContrato} from '../../../models/resumo-atendimento-renegociacao-contrato';
import {coreAnimations} from '../../../../../../../core/animations';
import {Cliente} from '../../../../cliente/models/Cliente';
import { Contrato } from "../../../../contrato/models/contrato";
import {
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';



@Component({
  selector: 'siiga-form-renegociacao',
  templateUrl: './form-renegociacao.component.html',
    styleUrls: ['./form-renegociacao.component.scss'],
    providers: [
      // The locale would typically be provided on the root module of your application. We do it at
      // the component level here, due to limitations of our example generation script.
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },

      // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
      // `MatMomentDateModule` in your applications root module. We provide it at the component level
      // here, due to limitations of our example generation script.
      {
          provide: DateAdapter,
          useClass: MomentDateAdapter,
          deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
      { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
  animations: coreAnimations
})
export class FormRenegociacaoComponent extends FormBase implements OnInit, AfterViewInit {

    isActive = true;
    private pValorTotalDividaContratos = 0;

    dadosCliente: Cliente;
    camposValidados: boolean = true;
    dataMinima = new Date();
    dataMaxima =  new Date(new Date().setDate(new Date().getDate()+30));
    ultimaAtualizacao = true;

    ngOnInit(): void {
        super.ngOnInit();

        this.model = this.model === undefined
            ?  new ResumoAtendimentoRenegociacaoContrato({})
            : (
                (this.model.idAtendimento !== undefined  && this.storage.retrieve('idAtendimento') != undefined)
                && this.model.idAtendimento === this.storage.retrieve('idAtendimento') ? this.model : new ResumoAtendimentoRenegociacaoContrato({})
            );
        this.formGroup = this.createForm();
        this.dadosCliente = new Cliente({});

        if (this.state === 'view') {
            this.consultarDadosCliente();
        }else{
            this.formGroup.markAllAsTouched();
        }
    }


    private consultarDadosCliente() {

        this.executeExternalService.next({
            module: 'cliente',
            serviceInstanceName: 'serviceCliente',
            method: 'getDadosCliente',
            result: ['dadosCliente']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {

        // TODO implementar caso com lista
        return this.formBuilder.group({
            idAtendimento: this.model.idAtendimento || this.storage.retrieve('idAtendimento'),
            dadosPagamento: [this.model.dadosPagamento, Validators.required],
            dataVencimento: [this.model.dadosPagamento.dataVencimento, Validators.required],
            juros: this.model.dadosPagamento.juros? this.model.dadosPagamento.juros : 0,
            valorDoPagamento: [this.model.dadosPagamento.valorDoPagamento, Validators.required],
            contratosFormFields: []
        });
    }

    getFormattedPrice(price: number) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    }

    redirect() {
        this.router.navigate(['/clientes/dados-cadastrais']);
    }

    objConfigSimulacao(extraParamsFromParent: any) {
        if(this.testaCampo(this.formGroup.value.dataVencimento, 'Vencimento')){
            return;
        }else{
            const obj = {
                action: 'create',
                module: 'renegociacao',
                serviceName: 'renegociacoes',
                resourcePathAPI: 'simulacoes',
                returnUrl: 'renegociacao',
                resourceValue: '',
                extraParams: this.storage.retrieve('extraParamsFromParent'),
                dataToSend: this.prepareModel(this.formGroup.get('idAtendimento').value || this.storage.retrieve('idAtendimento'))
            };
            return obj;
        }
    }
    objConfigSimulacaoRenegociacao(extraParamsFromParent: any) {
        if(this.testaCampo(this.formGroup.value.dataVencimento, 'Vencimento')){
            return;
        }else{
            const obj = {
                action: 'create',
                module: 'renegociacao',
                serviceName: 'renegociacoes',
                resourcePathAPI: 'simulacoes',
                returnUrl: 'renegociacoes/detail-resumos-renegociacao',
                resourceValue: '',
                extraParams: this.storage.retrieve('extraParamsFromParent'),
                dataToSend: this.prepareModel(this.formGroup.get('idAtendimento')?.value || this.storage.retrieve('idAtendimento'))
            };
            return obj;
        }
    }

    private prepareModel(idAtendimento) {
        if(this.formGroup.value.contratosFormFields === null){
            this.testaCampo(null, 'Valor Negociado');
            return;
        }else{
            let contratosListReturn = this.preencheDadosListContratos(this.model.listaDeContrato);
            let dadosPagamentoReturn = this.preencheDadosPagamento(this.model.dadosPagamento);

            return {
                id: idAtendimento,
                idAtendimento: idAtendimento,
                listaDeContrato: contratosListReturn,
                dadosPagamento: dadosPagamentoReturn
            };
        }
    }

    updateTotalValorNegociado(value: any) {
        if (undefined !== this.model && this.model !== null) {
            this.formGroup.get('valorDoPagamento').setValue(value);
        }
    }

    preencheDadosListContratos(listaDeContrato: Contrato[]) {
        let contratosFormGroup = this.formGroup.value.contratosFormFields.contratos;
        contratosFormGroup.forEach(itemc => {
            listaDeContrato.forEach(itemModel => {
                if(itemc.numeroContrato === itemModel.numeroDoContrato){
                    if(this.testaCampo(itemc.valorNegociado, 'Valor Negociado')){
                        return;
                    }
                    itemModel.condicoesOferecidas.valorNegociado = itemc.valorNegociado;
                    itemModel.condicoesOferecidas.dataPagamento = this.formGroup.value.dataVencimento;
                    if(this.testaCampo(itemc.desconto, 'desconto')){
                        return;
                    }
                    itemModel.condicoesOferecidas.desconto = itemc.desconto;
                    itemModel.condicoesOferecidas.juros = this.formGroup.value.juros || '0';
                    itemModel.condicoesOferecidas.valorDoPagamento = this.formGroup.value.valorDoPagamento;
                }
            });
        });
        return listaDeContrato;
    }

    private testaCampo(value, campo) {
        if(value === '' || value === undefined || value === null){
            this.alertService.error('O campo ' + campo + ' é de preenchimento obrigatório!');
            return true;
        }
        return false;
    }

    private preencheDadosPagamento(dadosPagamento: any) {
        if(this.testaCampo(this.formGroup.value.valorDoPagamento, 'valor do pagamento')){
            return;
        }
        dadosPagamento.valorDoPagamento = this.formGroup.value.valorDoPagamento;
        dadosPagamento.juros = this.formGroup.value.juros || '0';
        if(this.testaCampo(this.formGroup.value.dataVencimento, 'data de vencimento')){
            return;
        }
        dadosPagamento.dataVencimento = this.formGroup.value.dataVencimento;
        return dadosPagamento;
    }

    formatarValorCorrente(value) {
        var brValue = parseFloat(value.substring(2).trim().replace('.','').replace(',','.'));
        return brValue;
    }

    updateValidaBotoes(value: boolean) {
        var result = null;
        if(value != undefined){
            result = (value && !this.formGroup.valid);
            this.ultimaAtualizacao = result;
        }else{
            result = (this.ultimaAtualizacao && !this.formGroup.valid);
        }
        this.camposValidados = result;
    }

    enviaDados(obj: object) {
        // @ts-ignore
        if(obj.dataToSend != undefined){
            this.sendDynamicDataOperation(obj);
        }
    }
}
