import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SubFormList} from '../../../../forms/SubFormList';
import {CoreUtils} from '../../../../../../core/utils/CoreUtils';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {ArrayValidators} from '../../../../../../core/validators/ArrayValidators';

@Component({
  selector: 'siiga-sub-form-contratos-renovados',
  templateUrl: './sub-form-contratos-renovados.component.html',
  styleUrls: ['./sub-form-contratos-renovados.component.scss'],
  providers: [CoreUtils.subformComponentProviders(SubFormContratosRenovadosComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubFormContratosRenovadosComponent extends SubFormList implements OnInit {

  ngOnInit(): void {
    this.formGroup = this.createForm();
  }

  protected createForm() {
    const itemControl = {};
    this.formBuilder = new FormBuilder();
    this.itensForm = new FormArray([], ArrayValidators.minLength(1));
    itemControl[this.itemControlAlias] = this.itensForm;
    return this.formBuilder.group(itemControl);
  }

  addItens() {
    this.formArrayItens.push(this.newItens());
  }

  newItens(): any {
     return this.formBuilder.group({
      numeroContrato: [null, Validators.required],
      cnpj: [null, Validators.required]     
    });
  }

}
