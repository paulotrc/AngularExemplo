import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';

export class CustomValidators {

    static birthYear(c: FormControl): ValidationErrors {
        const numValue = Number(c.value);
        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 85;
        const maxYear = currentYear - 18;
        const isValid = !isNaN(numValue) && numValue >= minYear && numValue <= maxYear;
        const message = {
            years: {
                message: 'The year must be a valid number between ' + minYear + ' and ' + maxYear
            }
        };
        return isValid ? null : message;
    }

    static countryCity(form: FormGroup): ValidationErrors {
        const countryControl = form.get('country');
        const cityControl = form.get('city');

        if (countryControl != null && cityControl != null) {
            const country = countryControl.value;
            const city = cityControl.value;
            let error = null;

            if (country === 'France' && city !== 'Paris') {
                error = 'If the country is France, the city must be Paris';
            }

            const message = {
                countryCity: {
                    message: error
                }
            };

            return error ? message : null;
        }
    }

    static uniqueName(c: FormControl): Promise<ValidationErrors> {
        const message = {
            uniqueName: {
                message: 'The name is not unique'
            }
        };

        return new Promise(resolve => {
            setTimeout(() => {
                resolve(c.value === 'Existing' ? message : null);
            }, 1000);
        });
    }

    static telephoneNumber(c: FormControl): ValidationErrors {
        const isValidPhoneNumber = /^\d{3,3}-\d{5,5}-\d{4,4}$/.test(c.value);
        const message = {
            telephoneNumber: {
                message: 'The phone number must be valid (XXX-XXXXX-XXXX, where X is a digit)'
            }
        };
        return isValidPhoneNumber ? null : message;
    }

    static telephoneNumbers(form: FormGroup): ValidationErrors {

        const message = {
            telephoneNumbers: {
                message: 'At least one telephone number must be entered'
            }
        };

        const phoneNumbers = form.controls;
        const hasPhoneNumbers = phoneNumbers && Object.keys(phoneNumbers).length > 0;

        return hasPhoneNumbers ? null : message;
    }

    static email(c: FormControl): ValidationErrors {
        const isValidEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$/.test(c.value);
        console.log('isValidEmail: ', isValidEmail);
        const message = {
            email: {
                message: 'E-mail inválido!'
            }
        };
        return isValidEmail ? null : message;
    }

    static minPercent(min): ValidationErrors {
        return (c: FormControl): { minPercent: { message: string } } => {
            const numValue = Number(c.value);

            const isValidMin = numValue >= Number(min);

            const message = {
                minPercent: {
                    message: 'Valor inválido!',
                    min: min,
                    actual: numValue
                }
            };
            return isValidMin ? null : message;
        }
    }

    static maxPercent(max): ValidationErrors {
        return (c: FormControl): { maxPercent: { message: string } } => {
            const numValue = Number(c.value);

            const isValidMax = numValue <= Number(max);

            const message = {
                maxPercent: {
                    message: 'Valor inválido!',
                    max: max,
                    actual: numValue
                }
            };
            return isValidMax ? null : message;
        }
    }
}
