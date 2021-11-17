import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBase } from '../../../../../../common/forms';
import { CpfValidator } from '../../../../../../../core/validators/CpfValidator';
import { FormGroup, Validators } from '@angular/forms';
import {Contrato} from '../../../models/contrato';

@Component({
    selector: 'siiga-form-contratos',
    templateUrl: './detail-contratos.component.html',
    styleUrls: ['./detail-contratos.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailContratosComponent extends FormBase implements OnInit {

    ngOnInit(): void {
        super.ngOnInit();
        this.formGroup = this.createForm();
        this.model = this.dialogData.model;
    }

    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {
        return this.formBuilder.group({
            // nome: [this.model.nomeCliente, [Validators.required]],
            cpfCnpj: [this.model.cpfCnpj, Validators.required, CpfValidator.isValidCpf()]
        });
    }

    redirect() {
        this.router.navigate(['/contratos/dados-cadastrais']);
    }
}
