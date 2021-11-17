// Blacklist common values.
import {AbstractControl, Validators} from '@angular/forms';

const BLACKLIST: Array<string> = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678909'
];

const STRICT_STRIP_REGEX: RegExp = /[.-]/g;
const LOOSE_STRIP_REGEX: RegExp = /[^\d]/g;

export type verifierDigit = (digits: string) => number;
export type strip = (nuNumber: string, strict?: boolean) => string;
export type format = (nuNumber: string) => string;
export type isValid = (nuNumber: string, strict?: boolean) => boolean;
export type generate = (formatted?: boolean) => string;
export type isValidCpf = (control: AbstractControl) => Validators;

const verifierDigit: verifierDigit = (digits: string): number => {
    const numbers: Array<number> = digits
        .split('')
        .map(nuNumber => {
            return parseInt(nuNumber, 10);
        });

    const modulus: number = numbers.length + 1;
    const multiplied: Array<number> = numbers.map(( nuNumber, index) => nuNumber * (modulus - index));
    const mod: number = multiplied.reduce((buffer, nuNumber) => buffer + nuNumber) % 11;

    return (mod < 2 ? 0 : 11 - mod);
};

const strip: strip = ( nuNumber: string, strict?: boolean): string => {
    const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
    return ( nuNumber || '').replace(regex, '');
};

const format: format = ( nuNumber: string): string => {
    return strip(nuNumber).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
};

const isValid: isValid = ( nuNumber: string, strict?: boolean): boolean => {
    const stripped: string = strip( nuNumber, strict);

    // CPF must be defined
    if (!stripped) {
        return false;
    }

    // CPF must have 11 chars
    if (stripped.length !== 11) {
        return false;
    }

    // CPF can't be blacklisted
    if (BLACKLIST.includes(stripped)) {
        return false;
    }

    let numbers: string = stripped.substr(0, 9);
    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return numbers.substr(-2) === stripped.substr(-2);
};

const generate: generate = (formatted?: boolean): string => {
    let numbers = '';

    for (let i = 0; i < 9; i += 1) {
        numbers += Math.floor(Math.random() * 9);
    }

    numbers += verifierDigit(numbers);
    numbers += verifierDigit(numbers);

    return (formatted ? format(numbers) : numbers);
};

const isValidCpf: isValidCpf = (control: AbstractControl): Validators => {

    if ( null === control.value || control.value.trim() === '' ) {
        return null;
    }

    return isValid(control.value, true) ? null : { cpfNotValid: true } ;
};

export default {
    verifierDigit,
    strip,
    format,
    isValid,
    generate,
    isValidCpf
};
