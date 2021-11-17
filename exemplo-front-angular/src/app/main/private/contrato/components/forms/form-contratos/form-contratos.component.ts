import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBase} from '../../../../../../common/forms';
import {FormGroup} from '@angular/forms';
import {Contrato} from '../../../models/contrato';

@Component({
    selector: 'siiga-form-contratos',
    templateUrl: './form-contratos.component.html',
    styleUrls: ['./form-contratos.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FormContratosComponent extends FormBase implements OnInit {

    panelOpenState = true;

    model: Contrato;

    ngOnInit(): void {
        super.ngOnInit();
        this.model = new Contrato({});
        this.formGroup = this.createForm();
    }

    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {
        return this.formBuilder.group({
            valorNegociado: [this.model.condicoesOferecidas.valorNegociado],
            desconto: [this.model.condicoesOferecidas.desconto]
        });
    }

}
