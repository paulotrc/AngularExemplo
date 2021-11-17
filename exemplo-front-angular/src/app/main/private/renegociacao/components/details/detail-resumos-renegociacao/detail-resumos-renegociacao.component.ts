import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from '@form';
import { BoletoComponent } from '../../../../../../common/components/boleto/boleto.component';
import { coreAnimations } from '../../../../../../../core/animations';
import { Type } from '../../../../../../../app/common/interfaces/';
import { ResumoAtendimentoRenegociacaoContrato } from '../../../models/resumo-atendimento-renegociacao-contrato';
import { DadosPagamento } from '../../../models/dados-pagamento';
import { ResumoAtendimentoRenegociacaoContratoMock } from '../../../../../../common/helpers/fake-db/mocks/renegociacoes/ResumoAtendimentoRenegociacaoContratoMock';
import { DetailResumosRenegociacaoPdfComponent } from '../detail-resumos-renegociacao-pdf/detail-resumos-renegociacao-pdf.component';
import { CoreUtils } from '../../../../../../../core/utils/CoreUtils';
import { DetailBoletoPdfComponent } from '../detail-boleto-pdf/detail-boleto-pdf.component';
import { DadosBoleto } from '../../../../../../common/models/dados-boleto';
import { timeout } from '../../../../../../../core/decorators/timeout,ts';
import { Contrato } from "../../../../contrato/models/contrato";
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
    selector: 'siiga-detail-resumos-renegociacao',
    templateUrl: './detail-resumos-renegociacao.component.html',
    styleUrls: ['./detail-resumos-renegociacao.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: coreAnimations

})


export class DetailResumosRenegociacaoComponent extends FormBase implements OnInit, AfterViewInit {
    constructor(public dialog: MatDialog, private _location: Location) {
        super({});
    }

    @Output()
    onActionSelected: EventEmitter<any> = new EventEmitter();

    formComponent: Type<DetailResumosRenegociacaoPdfComponent> = DetailResumosRenegociacaoPdfComponent;

    model: ResumoAtendimentoRenegociacaoContrato;

    totalizadosDivida = 0;
    boletoComponent: Type<BoletoComponent> = BoletoComponent;

    // @ Public methods
    esconderDialogBoleto = true; // @todo revisar isso.

    dadosPagamento: DadosPagamento = new DadosPagamento({});
    dadosBoleto: DadosBoleto = new DadosBoleto({});
    isActive = true;

    statusRenegociacaoConcluida = true;

    ngOnInit(): void {
        super.ngOnInit();

        this.model = this.model || new ResumoAtendimentoRenegociacaoContrato({});
        this.formGroup = this.createForm();
    }

    ngAfterContentInit() {
        this.setValoresMonetarios();
    }

    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {
        return this.formBuilder.group({
            nome: [this.storage.retrieve('currentClient').nome],
            cpfCnpj: [this.storage.retrieve('currentClient').cpfCnpj]
        });
    }

    redirect() {
        this.router.navigate(['/contratos/xxxxxxx']); //  @todo Revisar: remover caso seja lixo.
    }
    public getFormattedPrice(valor: number) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    }

    @timeout(1000)
    setValoresMonetarios() {
        this.model.dadosPagamento.valorDoPagamento =
            this.getFormattedPrice(parseFloat(this.model.dadosPagamento.valorDoPagamento));
    }
    mostrarDialogBoleto() {
        if (this.esconderDialogBoleto === true) {
            this.esconderDialogBoleto = false;
        } else {
            this.esconderDialogBoleto = true;
        }
    }

    openBoleto() {
        this.modelService.getBoletoByIdAtendimento('modelBoleto');
        // this.onActionSelected.emit({ action: 'viewModel' });

        CoreUtils.openRegisterFormInModal(this,
            this.dadosBoleto, DetailBoletoPdfComponent,
            'Tem certeza de que deseja sair?',
            'view', 'view', 'Boleto de pagamento');
    }

    calculoMock() {
        this.model = ResumoAtendimentoRenegociacaoContratoMock.item(0);
        this.dadosPagamento = this.model.dadosPagamento;
        //  this.dataSourceContrato = this.model.listaDeContrato;
        this.totalizadosDivida = 0;
        let total = 0;

        function totalizar(contrato) {
            total += contrato.valorDividaTotal;
        }

        this.model.listaDeContrato.forEach(totalizar);
        this.totalizadosDivida = total * 60;
    }

    printResumo(model) {
        //this.openModal(DetailResumosRenegociacaoPdfComponent, model,
        //    'Tem certeza de que deseja Sair?', 'view', 'view', 'Boleto de pagamento');
        this.onActionSelected.emit({ action: 'viewModel', model });

        CoreUtils.openRegisterFormInModal(this, model, DetailResumosRenegociacaoPdfComponent,
            'Tem certeza de que deseja sair dessa funcionalidade?',
            'samples', 'edit', 'Editar');
    }

    // (click)="sendDataOperation('create', 'renegociacoes', 'renegociacao', 'renegociacoes/detail-resumos-renegociacao','','renegociacoes' , null, 'view')"
    objConfigRenegociacao(extraParamsFromParent: any) {
        const obj = {
            action: 'create',
            state: 'view',
            module: 'renegociacao',
            serviceName: 'renegociacoes',
            resourcePathAPI: 'renegociacoes',
            returnUrl: 'renegociacoes/detail-resumos-renegociacao',
            resourceValue: '',
            extraParams: this.storage.retrieve('extraParamsFromParent'),
            dataToSend: this.prepareModel(this.formGroup.get('idAtendimento')?.value || this.storage.retrieve('idAtendimento'))
        };
        this.storage.store('statusRenegociacaoConcluida' + (this.formGroup.get('idAtendimento')?.value || this.storage.retrieve('idAtendimento')), false);
        return obj;
    }

    objConfigBoleto(extraParamsFromParent: any) {
        const obj = {
            action: 'create',
            state: 'view',
            module: 'renegociacao',
            serviceName: 'renegociacoes',
            resourcePathAPI: 'boletos',
            returnUrl: 'renegociacoes/detail-boleto-pdf',
            resourceValue: '',
            extraParams: this.storage.retrieve('extraParamsFromParent'),
            dataToSend: this.prepareModel(this.formGroup.get('idAtendimento')?.value || this.storage.retrieve('idAtendimento'))
        };
        this.storage.store('statusRenegociacaoConcluida' + (this.formGroup.get('idAtendimento')?.value || this.storage.retrieve('idAtendimento')), false);
        return obj;
    }

    private prepareModel(idAtendimento) {
        return {
            id: idAtendimento,
            idAtendimento: idAtendimento,
            listaDeContrato: this.model.listaDeContrato,
            dadosPagamento: this.model.dadosPagamento
        };
    }

    renegociacaoConcluida() {
        if (this.storage.retrieve('statusRenegociacaoConcluida' + this.model.idAtendimento) === null) {
            return this.statusRenegociacaoConcluida;
        } else {
            return this.storage.retrieve('statusRenegociacaoConcluida' + this.model.idAtendimento);
        }
    }

    getValorDividaTotal(listaDeContrato: Contrato[]) {
        var sumValTot = 0;
        listaDeContrato.forEach(myFunction);

        function myFunction(item) {
            sumValTot += item.valorDividaTotal;
        }
        return sumValTot;
    }

    backClicked() {
        this._location.back();
    }

}
