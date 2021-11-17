import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBase} from '../../../../../../common/forms';
import {FormGroup, Validators} from '@angular/forms';
import { CoreUtils } from '../../../../../../../core/utils/CoreUtils';

@Component({
    selector: 'siiga-form-grupos',
    templateUrl: './form-grupos.component.html',
    styleUrls: ['./form-grupos.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FormGruposComponent extends FormBase implements OnInit {

    ngOnInit(): void {
        super.ngOnInit();
        this.model = this.dialogData.model;
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
        return this.formBuilder.group({
            id: [this.model.id, [Validators.required]],
            descricao: [this.model.descricao, [Validators.required]],
            excluido: "N",
            dataExclusao: "",
            situacaoEspecialList: []

        });
    }

    insertGrupo(): void {
        
        //metodo que fará o post na api
        this.sendDataOperation('create', 'grupos', 'grupo', 'situacao-especial/form-situacao-especial', '', 'grupos', '', 'edit');
        //fecha a modal e executa a busca de todos os grupos para atualizar a combo de grupo ta tela de inclusao de situação especial
        //@ts-ignore
        this.matDialog.closeAll();
        

    }
}
