import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from '@form';
import { coreAnimations } from '../../../../../../../core/animations';
import { MatDialog } from '@angular/material/dialog';
import { Campanha } from '../../../models/Campanha';
import * as _ from 'lodash';

@Component({
    selector: 'siiga-form-campanha',
    templateUrl: './form-campanha.component.html',
    styleUrls: ['./form-campanha.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: coreAnimations
})
export class FormCampanhaComponent extends FormBase implements OnInit, AfterViewInit {
    constructor(public dialog: MatDialog) {
        super({});
    }

    modelCampanha: Campanha;

    ngOnInit(): void {
        super.ngOnInit();
        this.model = new Campanha({});
        this.formGroup = this.createForm();
        this.addFormExtraParams('id');
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {
        return this.formBuilder.group({

        });
    }
    
    private prepareModel() {
        var obj = {
            
        };

        return obj;
    }

    salvaCampanha() {
        // @ts-ignore
        this.formGroup.value = this.prepareModel();
        this.sendDataOperation('create', 'campanhas', 'campanha', 'campanha/search-campanha', '', 'campanhas', '', 'edit');
    }

    retornar() {
        this.router.navigate(['/campanha/search-campanha']);
    }
}
