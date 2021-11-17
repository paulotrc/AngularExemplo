import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {SubFormList} from '../../../../forms/SubFormList';
import {CoreUtils} from '../../../../../../core/utils/CoreUtils';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'sub-form-input-list',
  templateUrl: './sub-form-input-list.component.html',
  styleUrls: ['./sub-form-input-list.component.scss'],
  providers: [CoreUtils.subformComponentProviders(SubFormInputListComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubFormInputListComponent extends SubFormList {

  @ViewChild('accordionInput', { static: true } ) accordionInput: MatAccordion;

  protected initialize(model = null) {
     super.initialize();

     this.changeDetector.detectChanges();

     this.openAllPanels();

  }

  closeAllPanels() {
    this.accordionInput.closeAll();
  }
  openAllPanels() {
    this.accordionInput?.openAll();
    }

}
