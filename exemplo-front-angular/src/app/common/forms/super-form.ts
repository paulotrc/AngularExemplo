import {AfterViewInit, Input, OnDestroy} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {CoreUtils} from '../../../core/utils/CoreUtils';
import {NameResolver} from '../../../core/interfaces/name-resolver';
import {NameResolverUtil} from '../../../core/utils/NameResolverUtil';
import {CoreAppInjector} from '../../../core/CoreAppInjector';
import {DatePipe} from '@angular/common';

export  abstract class  SuperForm implements ControlValueAccessor, OnDestroy, AfterViewInit {

    resolver: NameResolver = new NameResolverUtil();
    injector: CoreAppInjector = CoreAppInjector.getInjector();
    subscriptions: Subscription[] = [];
    formGroup: FormGroup;
    formGroupState: FormGroup;
    openModal: any;
    protected formBuilder: FormBuilder;
    unsubscribeAll: Subject<any>;
    @Input() action: string;
    @Input() state: string;
    @Input() model;
    @Input() debug = false;
    @Input()
    set currentState(pState: string) {
        this.state = pState;
        this.adjustApearanceField();
    }
    languages: [];
    datePipe: DatePipe;
    appearanceField = 'outline';
    currentDate = new Date();

    // @todo remover isso no futuro, para melhorar a performance.
    modelService: any;



    constructor() {
        this.unsubscribeAll = new Subject();

    }

    get value(): any {
        return this.formGroup.value;
    }

    set value(value: any) {
        this.formGroup.setValue(value);
        this.onChange(value);
        this.onTouched();
    }

    protected initialize() {
        this.subscriptions.push(
            this.formGroup?.valueChanges.subscribe(value => {
                this.onChange(value);
                this.onTouched();
            })
        );
    }

    adjustApearanceField() {
        this.appearanceField = this.state !== 'view' ? 'outline' : 'fill';
    }

    ngAfterViewInit(): void {
        this.adjustApearanceField();
        setTimeout(() => {
            this.initialize();
        }, 500);
    }

    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    protected createForm(): FormGroup {
        return this.formBuilder.group({
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s?.unsubscribe());
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    onChange: any = () => {};
    onTouched: any = () => {};

    registerOnChange(fn) {
        this.onChange = fn;
    }

    writeValue(value) {
        if (value) {
            this.value = value;
        }

        if (value === null) {
            this.formGroup.reset();
        }
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    validate(_: FormControl) {
        const obj: object = {};
        // obj[this.constructor.name] = { valid: false };
        let result  = null;

        if (!this.formGroup.valid) {
            result = obj[this.constructor.name] = { valid: false };
        }

        return result;
    }

    reset() {
        this.formGroup.reset();
    }

    getFormValidationErrors(formGroup) {
        return CoreUtils.getFormValidationErrors(formGroup);
    }

    protected markFormGroupTouched(formGroup: FormGroup) {
        (Object as any).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    getFormErrors(form: AbstractControl) {
        if (form instanceof FormControl) {
            // Return FormControl errors or null
            return form.errors ?? null;
        }
        if (form instanceof FormGroup) {
            const groupErrors = form.errors;
            // Form group can contain errors itself, in that case add'em
            const formErrors = groupErrors ? {groupErrors} : {};
            Object.keys(form.controls).forEach(key => {
                // Recursive call of the FormGroup fields
                const error = this.getFormErrors(form.get(key));
                if (error !== null) {
                    // Only add error if not null
                    formErrors[key] = error;
                }
            });
            // Return FormGroup errors or null
            return formErrors;
        }
    }


}
