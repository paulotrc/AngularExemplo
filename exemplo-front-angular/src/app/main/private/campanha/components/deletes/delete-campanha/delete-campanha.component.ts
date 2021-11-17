import { Component, OnInit } from '@angular/core';
import { FormBase } from "@form";
import { FormGroup } from "@angular/forms";
import { timeout } from "../../../../../../../core/decorators/timeout,ts";

@Component({
  selector: 'siiga-delete-campanha',
  templateUrl: './delete-campanha.component.html',
  styleUrls: ['./delete-campanha.component.scss']
})
export class DeleteCampanhaComponent extends FormBase implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
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
      id: this.model?.id
    });
  }

  deletarCampanha() {
    this.sendDataOperation('update', 'campanhas', 'campanha', 'campanha/search-campanha', '', 'campanhas/', '', '');
    this.emiteAlerta();
  }

  @timeout(500)
  private emiteAlerta() {
    this.alertService.info('Campanha excluída com sucesso!');
  }
}
