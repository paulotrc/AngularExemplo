import { ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

// Array Validators
export class ArrayValidators {

    // max length
    public static maxLength(max: number): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) { return; }
            return control.length > max ? { maxLength: true } : null;
        };
    }

    // min length
    public static minLength(min: number): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) { return; }
            return control.length < min ? { minLength: true } : null;
        };
    }

    // between length
    public static betweenLength(min: number, max: number): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) { return; }
            return control.length < min || control.length > max ? { betweenLength: true } : null;
        };
    }

    // Compara elementos com um valor, ele precisa de pelo menos uma correspondência em um formGroup
    public static equalsToSomeGroupKey(key: string, toCompare: number | string, strict: boolean = false): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) { return; }

            for (const item of control.value) {
                if (!item[ key ] && typeof item[ key ] === 'undefined') { return { equalsToSomeGroupKey: true, err: 'Property invalid' }; }

                const condition = strict ? item[ key ] === toCompare : item[ key ] === toCompare;

                if (condition) { return null; }
            }

            return { equalsToSomeGroupKey: true };
        };
    }

    // Compara em elementos com um valor, ele precisa de pelo menos uma correspondência em um formControl
    public static equalsToSomeElement(toCompare: number | string, strict: boolean = false): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) { return; }

            for (const item of control.value) {
                const condition = strict ? item === toCompare : item === toCompare;

                if (condition) { return null; }
            }

            return { equalsToSomeElement: true };
        };
    }

    // Verifica se 'key' existe em todos os grupos
    public static keyExistsInGroups(key: string): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) { return; }

            for (const item of control.value) {
                if (!item[ key ]) { return { keyExistsInGroups: true, item }; }
            }

            return null;
        };
    }

    // Verifica se 'key' em ao menos um grupo de elementos
    public static keyExistsInAtLeastOneGroup(key: string): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) { return; }

            for (const item of control.value) {
                if (item[ key ]) { return null; }
            }

            return { keyExistsInAtLeastOneGroup: true };
        };
    }

}
