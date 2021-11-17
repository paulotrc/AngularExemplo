import {Component, OnInit} from '@angular/core';
import {FormBase} from "@form";
import {SituacaoEspecial} from "../../../models/SituacaoEspecial";
import {FormGroup} from "@angular/forms";
import * as _ from 'lodash';
import {timeout} from "../../../../../../../core/decorators/timeout,ts";

@Component({
    selector: 'siiga-form-situacao-especial-inclusao-manual',
    templateUrl: './form-situacao-especial-inclusao-manual.component.html',
    styleUrls: ['./form-situacao-especial-inclusao-manual.component.scss']
})
export class FormSituacaoEspecialInclusaoManualComponent extends FormBase implements OnInit {

    displayedColumns: string[] = ['id', 'descricao'];
    listaPerfis: {checked:boolean, id: string; descricao: string;}[];
    idSituacao: number;

    ngOnInit(): void {
        super.ngOnInit();
        this.model = new SituacaoEspecial({});
        this.formGroup = this.createForm();
        this.idSituacao = this.storage.retrieve('idSituacao');
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.getSituacao();
        this.modelService.getListaPerfisInclusaoManual(['listaPerfis']);
        this.checkPermissao();

    }

    @timeout(300)
    private checkPermissao() {
        _.each(this.model.perfilInclusaoManualList, itemExistente => {
            _.each(this.listaPerfis, itemPerfil =>{
              if(itemPerfil.id === itemExistente.id){
                  itemPerfil.checked = true;
              }
            })
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    public getSituacao(): void {
        let obj = {
            result: 'model',
            idSituacao: this.idSituacao
        };
        this.modelService.getSituacaoById(obj);
    }
    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {
        return this.formBuilder.group({
            situacaoEspecial: this.model,
        });
    }

    salvaPerfisSituacao() {
        this.model.perfilInclusaoManualList = [];
        _.each(this.listaPerfis, itemLista => {
            if(itemLista.checked){
                this.model.perfilInclusaoManualList.push({id:itemLista.id, descricao : itemLista.descricao});
            }
        });
        // @ts-ignore
        this.formGroup.value = this.model;
        this.sendDataOperation('update', 'situacoes-especiais', 'situacao-especial', 'situacao-especial/search-situacao-especial', '', 'situacoes-especiais', '', 'edit');
    }

    marcarChecked(index: any) {
        _.each(this.listaPerfis, itemLista => {
          if(index.id === itemLista.id){
              itemLista.checked = !itemLista.checked;
          }
        });
    }

    retornar(){
        this.router.navigate(['/situacao-especial/search-situacao-especial']);

    }
}
