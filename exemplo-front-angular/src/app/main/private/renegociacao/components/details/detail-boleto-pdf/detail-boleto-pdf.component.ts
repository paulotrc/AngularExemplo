import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBase} from '@form';
import {coreAnimations} from '../../../../../../../core/animations';
import {Cliente} from '../../../../cliente/models/Cliente';
import {DadosBoleto} from '../../../../../../common/models/dados-boleto';
import {FormGroup} from "@angular/forms/forms";


@Component({
    selector: 'siiga-detail-boleto-pdf',
    templateUrl: './detail-boleto-pdf.component.html',
    styleUrls: ['./detail-boleto-pdf.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: coreAnimations

})
export class DetailBoletoPdfComponent extends FormBase implements OnInit, AfterViewInit {

    model: DadosBoleto;
    // -----------------------------------------------------------------------------------------------------
    totalizadosDivida = 0;
    dateNow: any;
    dadosCliente: Cliente;
    dadosBoleto: DadosBoleto;

    ngOnInit(): void {
        // debugger;
        super.ngOnInit();
        this.dateNow = new Date();
        this.model = this.dialogData?.model || new DadosBoleto({});
        this.formGroup = this.createForm();
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

    printPage() {
        window.print()
    }

    
}
