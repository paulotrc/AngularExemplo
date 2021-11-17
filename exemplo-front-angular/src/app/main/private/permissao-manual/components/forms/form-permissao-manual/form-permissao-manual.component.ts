import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBase } from '../../../../../../common/forms';
import { FormGroup } from '@angular/forms';
import { PermissaoManual } from '../../../models/PermissaoManual';

@Component({
    selector: 'siiga-form-permissao-manual',
    templateUrl: './form-permissao-manual.component.html',
    styleUrls: ['./form-permissao-manual.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None
})
export class FormPermissaoManualComponent extends FormBase implements OnInit {

    model: PermissaoManual;

    dynamicColumns: any[] = [
        { prop: 'descricao' }
    ];

    ngOnInit(): void {

        super.ngOnInit();
        this.model = this.model || new PermissaoManual({});
        this.formGroup = this.createForm();
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
}
