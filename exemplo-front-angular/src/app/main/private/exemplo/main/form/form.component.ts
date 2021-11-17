import {Component, ElementRef, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Exemplo} from '../../models/Exemplo';
import {BehaviorSubject} from 'rxjs';
import {FormBase} from '../../../../../common/forms';
import {AuthenticationService} from '@services';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CoreUtils} from '../../../../../../core/utils/CoreUtils';
import {CpfValidator} from '../../../../../../core/validators/CpfValidator';


@Component({
    selector: 'siiga-exemplo-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormComponent extends FormBase implements OnInit {

    action: string;
    model: Exemplo;


    yearsList: string[] = ['2019', '2018', '2017', '2016', '2016', '2014'];

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {
        const formGroup =  this.formBuilder.group({
            id: [this.model.id],
            titulo: [this.model.titulo, Validators.required],
            codigoReceita: [this.model.codigoReceita, [Validators.required, CpfValidator.isValidCpf()]],
            objetivo: [this.model.objetivo, Validators.required],
            cargaHoraria: [this.model.cargaHoraria, Validators.required],
            valor: [this.model.valor, Validators.required],
            preRequisito: [this.model.preRequisito, Validators.required],
            publicoAlvo: [this.model.publicoAlvo, Validators.required],
            documentosObrigatorios: [this.model.documentosObrigatorios, Validators.required],
            resultadoEsperado: [this.model.resultadoEsperado, Validators.required],
            conteudoProgramatico: [this.model.conteudoProgramatico, Validators.required],
            modalidade: [this.model.modalidade, Validators.required],
            liberarComprarVoucher: [this.model.liberarComprarVoucher, Validators.required],
            status: [this.model.status, Validators.required],
            ano: [this.model.ano, Validators.required],
        });

        // setTimeout(() => {
        if (this.state === 'view') {
                this.isDisabled = true;
                // formGroup.disable();
            }
        // }, 2000);

        return formGroup;
    }

    ngOnInit() {
        // Set the defaults
        this.module = 'exemplo';
        this.resourcePathAPI = 'exemplo';
        this.serviceName = 'exemplo';
        this.returnUrl = '/exemplo';
        this.action = this.dialogData.action || 'exemplo';
        this.state = this.dialogData.state || this.state;
        this.model = this.dialogData.model || new Exemplo({});
        this.dialogTitle = this.dialogData.dialogTitle || '';
        this.onModelDataOperation = this.dialogData.onModelDataOperation;
        this.onCloseModal = this.dialogData.onCloseModal;
        this.formGroupState = this.formGroup = this.createForm();
        super.ngOnInit();
    }
}
