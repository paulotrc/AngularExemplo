import {Component, ChangeDetectionStrategy, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { SubFormList } from 'app/common/forms/SubFormList';
import { CoreUtils } from 'core/utils/CoreUtils';
import {FormBuilder, FormArray, Validators, AbstractControl} from '@angular/forms';
import {ArrayValidators} from '../../../../../../core/validators/ArrayValidators';
import {Endereco} from '../../../../../common/models/endereco';
import {MatAccordion} from '@angular/material/expansion';
import {timeout} from "../../../../../../core/decorators/timeout,ts";

@Component({
  selector: 'sub-form-enderecos',
  templateUrl: './sub-form-enderecos.component.html',
  styleUrls: ['./sub-form-enderecos.component.scss'],
  providers: [CoreUtils.subformComponentProviders(SubFormEnderecosComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubFormEnderecosComponent extends SubFormList implements OnInit {

  @ViewChild('accordionEnderecos', { static: true } ) accordionEnderecos: MatAccordion;

  ngOnInit(): void {
    // super.ngOnInit();
    this.formGroup = this.createForm();
    // this.formGroup.patchValue({ name: 'name' });
    // this.addItens();
    // this.initialize();

  }

  protected createForm() {
    const itemControl = {};
    this.formBuilder = new FormBuilder();
    this.itensForm = new FormArray([], ArrayValidators.minLength(1));
    itemControl[this.itemControlAlias] = this.itensForm;
    return this.formBuilder.group(itemControl);
  }

  addItemToModel(controls: AbstractControl[]) {
/*    this.model = this.formGroup.value.enderecos.slice() as Endereco[];
    this.model.push(new Endereco({}));
    this.model = this.model.reverse();
    this.formArrayItens.clear();
    this.initialize(this.model);*/
    // this.addItens();
    this.formArrayItens.controls.unshift(this.newItens());
    const tmp = this.formArrayItens.controls.slice();
    this.formArrayItens.clear();
    this.formArrayItens.controls = tmp;
    this.changeDetector.detectChanges();
  }


  addItens(item: Endereco = null) {
      this.formArrayItens.push(this.newItens(item));
  }


  newItens(item: Endereco = null): any {

    item = (item === null) ? new Endereco({}) : item;

    return this.formBuilder.group({
      cep: [item?.cep, Validators.required],
      uf: [item?.uf, Validators.required],
      cidade: [item?.nomeLocalidade, Validators.required],
      bairro: [item?.bairro, Validators.required],
      logradouro: [item?.logradouro, Validators.required],
      numero: [item?.numero, Validators.required],
        complemento: [item?.complemento, Validators.required]
    });
  }

  protected initialize(model = null) {
    console.log('INITIALIZE::: ');
    model = model || this.model;
    if ( Array.isArray(model) ) {
        this.model.forEach(item => {
          this.addItens(item);
        });
    }

    this.subscriptions.push(
            this.formGroup?.valueChanges.subscribe(value => {
              this.onChange(value);
              this.onTouched();
            })
    );

    this.changeDetector.detectChanges();

    this.openAllPanels();

  }

  closeAllPanels() {
    this.accordionEnderecos.closeAll();
  }
  openAllPanels() {
    this.accordionEnderecos?.openAll();
  }






}
