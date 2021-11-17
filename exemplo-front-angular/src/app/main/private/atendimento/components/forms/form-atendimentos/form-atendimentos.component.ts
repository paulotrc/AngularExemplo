import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CpfValidator } from '../../../../../../../core/validators/CpfValidator';
import { FormGroup, Validators } from '@angular/forms';
import { FormBase } from '../../../../../../common/forms';
import { Atendimento } from '../../../models/Atendimento';

@Component({
    selector: 'siiga-form-atendimentos',
    templateUrl: './form-atendimentos.component.html',
    styleUrls: ['./form-atendimentos.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FormAtendimentosComponent extends FormBase implements OnInit {

    model: Atendimento;

    ngOnInit(): void {
        super.ngOnInit();
        this.module = 'atendimento';
        this.model = this.model || new Atendimento({});
        this.formGroup = this.createForm();
        this.addFormExtraParams('id');
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
        return this.formBuilder.group({
            cpfCnpj: [this.model.cpfCnpj, [Validators.required, CpfValidator.isValidCpf()]],
            // titulo: [this.model.titulo, Validators.required],

        });
    }
    isCPF(): boolean {
        return this.model.cpfCnpj == null ? true : this.model.cpfCnpj.length < 12 ? true : false;
    }

    getCpfCnpjMask(): string {
        return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
    }

}
