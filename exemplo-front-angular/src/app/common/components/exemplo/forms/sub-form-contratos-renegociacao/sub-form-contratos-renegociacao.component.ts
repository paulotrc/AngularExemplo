import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SubFormList } from 'app/common/forms/SubFormList';
import { CoreUtils } from 'core/utils/CoreUtils';
import { AbstractControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ArrayValidators } from '../../../../../../core/validators/ArrayValidators';
import { MatAccordion } from '@angular/material/expansion';
import { Contrato } from '../../../../../main/private/contrato/models/contrato';
import { timeout } from '../../../../../../core/decorators/timeout,ts';
import { CustomValidators } from "../../../../../../core/validators/CustomValidators";

@Component({
    selector: 'sub-form-contratos-renegociacao',
    templateUrl: './sub-form-contratos-renegociacao.component.html',
    styleUrls: ['./sub-form-contratos-renegociacao.component.scss'],
    providers: [CoreUtils.subformComponentProviders(SubFormContratosRenegociacaoComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubFormContratosRenegociacaoComponent extends SubFormList implements OnInit {



    @Output()
    onChangeValorNegociado = new EventEmitter<any>();

    @Output()
    onValidaCampos = new EventEmitter<any>();

    @ViewChild('accordionContratos', { static: true }) accordionContratos: MatAccordion;

    pValorTotalDividaContratos = 0;
    pValorTotalDividaContratosFormatado = "R$ 0,00";
    pValorTotalNegociados = 0;
    disableButtons = true;

    ngOnInit(): void {
        this.state = 'edit';
        this.formGroup = this.createForm();
    }

    protected createForm() {
        const itemControl = {};
        this.formBuilder = new FormBuilder();
        this.itensForm = new FormArray([], ArrayValidators.minLength(1));
        itemControl[this.itemControlAlias] = this.itensForm;
        return this.formBuilder.group(itemControl);
    }

    addItemToModel(controls: AbstractControl[]) {
        this.formArrayItens.controls.unshift(this.newItens());
        this.formArrayItens.clear();
        this.changeDetector.detectChanges();
    }


    addItens(item: Contrato = null) {
        this.formArrayItens.push(this.newItens(item));
    }


    newItens(item: Contrato = null): any {

        item = (item === null) ? new Contrato({}) : item;

        var valorTot = parseFloat(item?.valorDividaTotal);
        var valorMin = parseFloat(item.condicoesOferecidas.valorMinimo);
        var percMinimo = (valorMin * 100) / valorTot;

        var tamanhoMaxValNeg = valorTot.toString().replace('.', '').length;


        return this.formBuilder.group({
            numeroContrato: item.idContrato,
            produtoDescricao: [(item?.produtoCodigo + ' / ' + item?.produtoDescricao), Validators.required],
            status: [(item?.status === 'A' ? 'Em Atraso' : (item?.status === 'I' ? 'Inadimplente' : 'Prejuízo')) + ' / ' + item?.prazo + ' dias', Validators.required],
            prazo: [item?.prazo + ' dias', Validators.required],
            valorCA: [(item?.valorCA), Validators.required],
            valorMinimo: [(item.condicoesOferecidas.valorMinimo), Validators.required],
            valorDividaTotal: [(item?.valorDividaTotal), Validators.required],
            valorContratado: [(item?.valorContratado), Validators.required],
            valorNegociado: [
                (item?.condicoesOferecidas?.valorNegociado ? item?.condicoesOferecidas?.valorNegociado : ''),
                [
                    Validators.required,
                    Validators.max(Number(item?.valorDividaTotal)),
                    Validators.min(Number(item.condicoesOferecidas.valorMinimo))
                ]
            ],
            desconto: [
                item?.condicoesOferecidas?.desconto ? (
                    item?.condicoesOferecidas?.desconto ? item?.condicoesOferecidas?.desconto : '')
                    .substring(2).trim() : '',
                [
                    Validators.required,
                    CustomValidators.maxPercent(100 - percMinimo),
                    CustomValidators.minPercent(0)
                ]
            ]
        });
    }




    @timeout(2000)
    protected initialize(model = null) {

        model = model || this.model;
        console.log('INITIALIZE::: ', model);
        if (Array.isArray(model)) {
            this.model.forEach(item => {
                this.addItens(item);
            });
        }

        this.subscriptions.push(
            this.formGroup?.valueChanges.subscribe(value => {
                this.onChange(value);
                this.onTouched();
            })
        );

        this.somatorioDividaContratos();

        this.changeDetector.detectChanges();

        this.openAllPanels();

    }

    closeAllPanels() {
        this.accordionContratos.closeAll();
    }
    openAllPanels() {
        this.accordionContratos?.openAll();
    }


    public somatorioDividaContratos() {
        this.pValorTotalDividaContratos = 0;
        // @ts-ignore
        this.formGroup.controls.contratos.controls.forEach(item => {
            this.pValorTotalDividaContratos += Number(item.value.valorDividaTotal);
        });
        this.pValorTotalDividaContratosFormatado = this.pValorTotalDividaContratos.toString();
    }

    @timeout(300)
    onBlur($event) {
        console.log($event.target.value);
    }

    @timeout(300)
    focusIn($event) {
        console.log($event.target.value);
        var iCaretPos = $event.target.value.length;
        $event.target.setSelectionRange(iCaretPos, iCaretPos);
    }

    @timeout(300)
    public calcularValorDesconto(item) {
        item.controls.desconto.setValue(0);

        let valorNeg;
        if (item.controls.valorNegociado.value === '') {
            valorNeg = 0;
        } else {
            valorNeg = item.controls.valorNegociado.value;
        }

        const valorTot = Number(item.controls.valorDividaTotal.value);
        const valorMin = Number(item.controls.valorMinimo.value);

        if (!(valorNeg > valorTot || valorNeg <= valorMin)) {
            item.controls.desconto.setValue(100 - (valorNeg * 100) / valorTot);
            this.somatorioValorNegociado();
        }
    }

    @timeout(300)
    public calcularValorNegociado(item) {
        this.pValorTotalNegociados = 0;
        item.controls.valorNegociado.setValue(0);
        let valorDesc;
        if (item.controls.desconto.value === '') {
            valorDesc = 0;
        } else {
            valorDesc = item.controls.desconto.value;
        }
        const valorTot = Number(item.controls.valorDividaTotal.value);
        const valorMin = Number(item.controls.valorMinimo.value);

        const totalMenosPercentual = valorTot - (valorTot * (valorDesc / 100));
        if (totalMenosPercentual > valorMin) {
            item.controls.valorNegociado.setValue(totalMenosPercentual);
            this.somatorioValorNegociado();
        }
    }

    private somatorioValorNegociado() {
        this.pValorTotalNegociados = 0;
        // @ts-ignore
        this.formGroup.controls.contratos.controls.forEach(item => {
            this.pValorTotalNegociados += item.controls.valorNegociado.value;
        });
        this.onChangeValorNegociado.emit(this.pValorTotalNegociados);
    }

    formatarValorCorrente(value) {
        var brValue = parseFloat(value.substring(2).trim().replace('.', '').replace(',', '.'));
        return brValue;
    }





}
