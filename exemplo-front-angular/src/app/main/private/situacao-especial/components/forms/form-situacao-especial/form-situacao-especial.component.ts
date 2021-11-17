import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FormBase } from '@form';
import { coreAnimations } from '../../../../../../../core/animations';
import { Type } from '../../../../../../../app/common/interfaces/';
import { CoreUtils } from '../../../../../../../core/utils/CoreUtils';
import { timeout } from '../../../../../../../core/decorators/timeout,ts';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { FormGruposComponent } from '../../../../grupo/components/forms/form-grupos/form-grupos.component';
import { SituacaoEspecial } from '../../../models/SituacaoEspecial';
import { Grupo } from '../../../../grupo/models/Grupo';
import { Impedimento } from '../../../models/Impedimento';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as _ from 'lodash';
import { ErrorStateMatcher } from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    selector: 'siiga-form-situacao-especial',
    templateUrl: './form-situacao-especial.component.html',
    styleUrls: ['./form-situacao-especial.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: coreAnimations
})
export class FormSituacaoEspecialComponent extends FormBase implements OnInit, AfterViewInit {
    constructor(public dialog: MatDialog, private _location: Location) {
        super({});
    }

    @Output()
    onActionSelected: EventEmitter<any> = new EventEmitter();

    formComponent: Type<FormGruposComponent> = FormGruposComponent;

    model: SituacaoEspecial;

    todosGrupos: Grupo[];
    impedimentos: Impedimento[];
    tipoConsultaGrupo: boolean;
    listaImpedimento: { id: string; descricao: string; }[] = [];

    ngOnInit(): void {
        super.ngOnInit();
        this.model = new SituacaoEspecial({});
        this.formGroup = this.createForm();
        this.addFormExtraParams('id');
        this.getGrupos();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.modelService.getImpedimentos(['impedimentos']);
    }

    getGrupos() {
        this.executeExternalService.next({
            module: 'grupo',
            serviceInstanceName: 'serviceGrupo',
            method: 'getGrupos',
            result: ['todosGrupos']
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
        const matcher = new MyErrorStateMatcher();

        return this.formBuilder.group({
            opcaoGrupo: true,
            idSituacao: [this.model.id, [Validators.required]],
            descricaoSituacao: [this.model.descricao, [Validators.required]],
            observacao: "",
            grupo: [0, [Validators.required]],
            excluido: "N"

        });
    }

    openInclusaoGrupo() {
        CoreUtils.openRegisterFormInModal(this, {}, FormGruposComponent,
            'Tem certeza de que deseja cancelar?', 'Create', 'new', 'Cadastramento de grupo para situa��o especial');

        this.dialogRef.afterClosed()
            .subscribe((objEvent) => {
                this.getGrupos();
            });
    }

    private prepareModel() {
        var dataToSend = {
            id: this.formGroup.value.idSituacao,
            descricao: this.formGroup.value.descricaoSituacao,
            grupo: this.formGroup.value.grupo,
            observacao: this.formGroup.value.observacao,
            excluido: "N",
            impedimentoList: this.listaImpedimento
        };

        const obj = {
            action: 'create',
            module: 'situacao-especial',
            serviceName: 'situacoes-especiais',
            resourcePathAPI: 'situacoes-especiais',
            returnUrl: 'situacao-especial/form-situacao-especial',
            resourceValue: '',
            extraParams: '',
            dataToSend: dataToSend
        };

        return obj;
    }

    checkImpedimento(event: MatCheckboxChange, item): void {

        if (event.checked) {
            this.listaImpedimento.push({ id: item.id, descricao: item.descricao });
        } else {
            this.listaImpedimento.forEach((i, index) => {
                if (i.id === item.id) {
                    this.listaImpedimento.splice(index, 1);
                }
            });
        }
    }

    salvaSituacao() {
        this.formGroup.markAllAsTouched();
        // @ts-ignore
        var obj = this.prepareModel();
        this.sendDynamicDataOperation(obj);
    }

    retornar() {
        this.router.navigate(['/situacao-especial/search-situacao-especial']);

    }
}
