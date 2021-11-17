import {
  Directive,
  Optional,
  Inject,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  Host,
  OnInit, OnDestroy, InjectionToken
} from '@angular/core';
import { NgControl, ControlContainer } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FORM_ERRORS } from '../forms/form-errors';
import { ControlErrorComponent } from '../forms/control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { merge, EMPTY, Observable } from 'rxjs';
import {CoreUtils} from '../../../core/utils/CoreUtils';

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  ref: ComponentRef<ControlErrorComponent>;
  container: ViewContainerRef;
  submit$: Observable<Event>;
  @Input() customErrors = {};

  constructor(
      private vcr: ViewContainerRef,
      private resolver: ComponentFactoryResolver,
      @Optional() controlErrorContainer: ControlErrorContainerDirective,
      @Inject(FORM_ERRORS) private errors: InjectionToken<any>,
      @Optional() @Host() private form: FormSubmitDirective,
      private controlDir: NgControl) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    merge(
        this.submit$,
        this.control.valueChanges
    ).pipe(
        untilDestroyed(this)).subscribe((v) => {
      const controlErrors = this.control.errors;
      if (controlErrors) {
        let firstKey = Object.keys(controlErrors)[0];
        firstKey = ( undefined !== firstKey ) ? CoreUtils.trim(firstKey) : firstKey;
        const getError = this.errors[firstKey];
        const text = this.customErrors[firstKey] || getError(controlErrors[firstKey]);
        this.setError(text);
      } else if (this.ref) {
        this.setError(null);
      }
    });
  }

  get control() {
    return this.controlDir.control;
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.inputText = text;
  }

  ngOnDestroy() { }

}