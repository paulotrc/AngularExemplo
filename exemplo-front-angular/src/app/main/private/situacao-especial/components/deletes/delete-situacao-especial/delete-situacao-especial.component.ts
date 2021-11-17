import { Component, OnInit } from '@angular/core';
import { FormBase } from "@form";
import { FormGroup } from "@angular/forms";
import { timeout } from "../../../../../../../core/decorators/timeout,ts";

@Component({
    selector: 'siiga-delete-situacao-especial',
    templateUrl: './delete-situacao-especial.component.html',
    styleUrls: ['./delete-situacao-especial.component.scss']
})
export class DeleteSituacaoEspecialComponent extends FormBase implements OnInit {

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
            id: this.model?.id,
            descricao: this.model?.descricao,
            grupo: this.model?.grupo,
            grupoDescricao: this.model?.grupoDescricao,
            observacao: this.model?.observacao,
            dataExclusao: new Date(),
            excluido: 'S'
        });
    }

    deletarSituacaoEspecial() {

        this.fecharModal();

    }

    @timeout(500)
    private emiteAlerta() {
        this.alertService.info('Situação especial excluída com sucesso!');
    }

    fecharModal() {
        let cn = confirm('Deseja realmente excluir a situação especial?')
        if (cn) {
            this.sendDataOperation('update', 'situacoes-especiais', 'situacao-especial', 'situacao-especial/search-situacao-especial', '', 'situacoes-especiais/', '', '');
            // @ts-ignore
            this.matDialog.closeAll();
            this.emiteAlerta();
        }
    }
}
