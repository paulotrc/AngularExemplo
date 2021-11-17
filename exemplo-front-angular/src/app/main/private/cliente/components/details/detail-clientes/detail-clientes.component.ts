import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormBase } from '../../../../../../common/forms';
import { CpfValidator } from '../../../../../../../core/validators/CpfValidator';
import { FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../models/Cliente';
import { CoreUtils } from "core/utils/CoreUtils";


@Component({
    selector: 'siiga-form-clientes',
    templateUrl: './detail-clientes.component.html',
    styleUrls: ['./detail-clientes.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CoreUtils.subformComponentProviders(Cliente)]
})
export class DetailClientesComponent extends FormBase implements OnInit {
    queryParam: string;
    model: Cliente;
    debug = false;

    ngOnInit(): void {
        super.ngOnInit();
        this.model = this.model || new Cliente({});
        this.formGroup = this.createForm();
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
        let emails = this.model.emails;
        let enderecos = this.model.enderecos;
        let telefones = this.model.telefones;
        // TODO implementar caso com lista
        return this.formBuilder.group({
            nome: this.model.nome,
            cpfCnpj: this.model.cpfCnpj,
            idAtendimento : this.model.idAtendimento
        });
    }

    redirect() {
        this.router.navigate(['/clientes/dados-cadastrais']);
    }

    redirectCancelar() {
        this.router.navigate(['/clientes/search-clientes']);
    }

    allInfo(data) {
        return data.prefixo + ' - ' + data.numero;
    }

}
