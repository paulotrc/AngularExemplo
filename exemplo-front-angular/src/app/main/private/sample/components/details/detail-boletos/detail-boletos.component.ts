import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBase} from '../../../../../../common/forms';
import {CpfValidator} from '../../../../../../../core/validators/CpfValidator';
import {FormGroup, Validators} from '@angular/forms';
import {Sample} from '../../../models/Sample';

@Component({
  selector: 'siiga-form-samples',
  templateUrl: './detail-boletos.component.html',
  styleUrls: ['./detail-boletos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailBoletosComponent extends FormBase implements OnInit {

  model: Sample;

  ngOnInit(): void {
    super.ngOnInit();
    this.action = 'get';
    this.module = 'sample';
    this.serviceName = 'samples';
    this.resourcePathAPI = 'boletos';

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
      // titulo: [this.model.titulo, Validators.required],

    });
  }

}
