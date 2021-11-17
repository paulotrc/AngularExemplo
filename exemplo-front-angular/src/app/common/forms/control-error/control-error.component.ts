import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'siiga-control-error-component',
  templateUrl: './control-error-component.component.html',
  styleUrls: ['./control-error-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent implements OnInit {

  inputValue;
  hideError = true;

  @Input() set inputText(value) {
    if (value !== this.inputValue) {
      this.inputValue = value;
      this.hideError = !value;
      this.cdr.detectChanges();
    }
  };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
