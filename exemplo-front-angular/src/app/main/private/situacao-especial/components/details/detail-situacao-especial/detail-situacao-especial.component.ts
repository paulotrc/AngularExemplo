import { Component, OnInit } from '@angular/core';
import {FormBase} from "@form";
import {FormGroup} from "@angular/forms";
import * as _ from 'lodash';

@Component({
  selector: 'siiga-detail-situacao-manual',
  templateUrl: './detail-situacao-especial.component.html',
  styleUrls: ['./detail-situacao-especial.component.scss']
})
export class DetailSituacaoEspecialComponent extends FormBase implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
    this.model = this.ordenaListaPerfilManual(this.dialogData.model);

    this.formGroup = this.createForm();
  }

  private ordenaListaPerfilManual(model: any) {
    if(model.perfilInclusaoManualList != undefined){
      model.perfilInclusaoManualList = _.orderBy(model.perfilInclusaoManualList, ['id'], ['asc']);
    };

    if(model.observacao === undefined){
      model.observacao = '';
    }

    return model;
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
    });
  }

  fecharModal(){
    // @ts-ignore
    this.matDialog.closeAll();
  }

}
