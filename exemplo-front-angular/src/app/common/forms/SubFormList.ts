import {AfterViewInit, ChangeDetectorRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {SuperForm} from './super-form';
import {ArrayValidators} from '../../../core/validators/ArrayValidators';
import {Type} from '../interfaces';
import {CustomValidators} from '../../../core/validators/CustomValidators';
import {AlertService} from "@services";
import {CoreAppInjector} from "../../../core/CoreAppInjector";


export class SubFormList extends SuperForm implements OnInit, AfterViewInit {

    @Input() title = 'Título do Componente';
    @Input() icon = 'Icone do Componente';
    @Input() label = 'Label do Componente';
    @Input() maxlength = 100;
    @Input() pattern;
    @Input() required = true;
    @Input() itemControlAlias = 'itens';
    @Input() type = 'text';
    @Input() mask: string;
    @Input() fieldsToView: string[] = [];

    @Output() onChangeItens: EventEmitter<string> = new EventEmitter<string>();
    itensForm: FormArray ;
    identifyer = (index: number, item: any) => index;
    alertService: AlertService;

    constructor(protected changeDetector: ChangeDetectorRef) {
        super();
        const injector = CoreAppInjector.getInjector();
        this.alertService = injector.get(AlertService);
    }

    ngOnInit(): void {
        console.log('MODEL::: ', this.model);
        this.pattern = (this.pattern === undefined) ? '^.{1,' + this.maxlength + '}$' : this.pattern;
        this.formGroup = this.createForm();

    }

    protected createForm() {
        const itemControl = {};
        this.itensForm = new FormArray([], ArrayValidators.minLength(1));
        this.formBuilder = new FormBuilder();
        itemControl[this.itemControlAlias] = this.itensForm;
        return this.formBuilder.group(itemControl);
    }
    // E-mails
    get itens(): FormArray {
        return this.formGroup.get(this.itemControlAlias) as FormArray;
    }

    addItens() {
        this.formArrayItens.push(this.newItem());
    }

    removeItem(i: number) {
        this.formArrayItens.removeAt(i);
    }

    newItem( value: any = null ): FormControl {
        console.log('FormControl_VALUE ', value);
        const validators: any[] = [];
        if (this.required) {
            validators.push(Validators.required);
            this.mask = null;
        }
        if (this.type === 'email') {
            validators.push(CustomValidators.email);
        } else if (this.type === 'text') {
            validators.push(Validators.pattern(this.pattern));
        } else if (this.type === 'tel') {
            // validators.push(CustomValidators.telephoneNumber);
            validators.push(Validators.required);
            this.mask = '(00) 00000-0000';
        }

        const formControl: FormControl =  new FormControl(value, validators );
/*        formControl.setValue('xxxxxxxxx');
        formControl.patchValue('xxxxxxxxx');*/
        console.log('formControl = ', formControl);
        return  formControl;
    }

    protected initialize() {
        super.initialize();

        if ( this.model !== undefined && this.model !== null) {
            if ( this.model.length !== undefined ) {
                this.model.forEach(item => {
                    if (item !== null) {
                        let fieldValue = '';

                        if ( this.fieldsToView.length > 0 ) {

                            this.fieldsToView.forEach(field => {
                                console.log('FIELD_VALUE ', this.type , field,  fieldValue, item[field]);
                                fieldValue += '' + item[field];
                            });

                            console.log('FIELD_VALUE ', this.type ,  fieldValue);

                            this.formArrayItens.push(this.newItem(fieldValue));
                        } else {
                            this.formArrayItens.push(this.newItem(fieldValue));
                        }

                        // });
                    }
                });
            }
        }






    }

    get formArrayItens(): FormArray {
        return this.formGroup.get(this.itemControlAlias) as FormArray;
    }

    set formArrayItens(formArray: FormArray) {
        this.formGroup.get(this.itemControlAlias).setValue(formArray);
    }

}
