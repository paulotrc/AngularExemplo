import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBase} from '../../../../../../common/forms';
import {CpfValidator} from '../../../../../../../core/validators/CpfValidator';
import {FormGroup, Validators} from '@angular/forms';
import {Sample} from '../../../models/Sample';

@Component({
  selector: 'siiga-form-samples',
  templateUrl: './form-samples.component.html',
  styleUrls: ['./form-samples.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormSamplesComponent extends FormBase implements OnInit {

  model: Sample;

  ngOnInit(): void {
    super.ngOnInit();
    this.model = new Sample({});
    this.formGroup = this.createForm();
    this.addFormExtraParams('id');
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
      cpf: [this.model.name,  [Validators.required, CpfValidator.isValidCpf()]],
      emailsFormFields: [],
      telefonesFormFields: []

    });
  }

}
