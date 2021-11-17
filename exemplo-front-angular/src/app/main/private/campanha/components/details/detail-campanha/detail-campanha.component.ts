import { Component, OnInit } from '@angular/core';
import {FormBase} from "@form";
import {FormGroup} from "@angular/forms";
import * as _ from 'lodash';

@Component({
  selector: 'siiga-detail-campanha',
  templateUrl: './detail-campanha.component.html',
  styleUrls: ['./detail-campanha.component.scss']
})
export class DetailCampanhaComponent extends FormBase implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
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
