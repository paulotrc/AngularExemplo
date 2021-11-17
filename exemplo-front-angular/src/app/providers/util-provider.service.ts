import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilProviderService {

  constructor() { }



  public static isCnpj(value: string): boolean {
    if (value.replace(/\D/g, '').length === 14) {
      return true;
    } else {
      return false;
    }
  }

  public static isCpf(value: string): boolean {
    if (value.replace(/\D/g, '').length === 11) {
      return true;
    } else {
      return false;
    }
  }

  public static validateNumberEqual(numberToValidate: string) {
    const numberReplace = numberToValidate.replace(/\D/g, '');

    const numberEqual: string = numberReplace.substring(0, 1);
    let booleanEqualNumber = false;
    for (let index = 0; index < numberReplace.length; index++) {
      if (numberEqual !== numberReplace[index]) {
        booleanEqualNumber = true;
      }
    }

    return booleanEqualNumber;
  }

  public static validateFirstNumberValidatorCPF(numberToValidate: string): boolean {
    let sum = 0;
    let rest = 0;

    for (let i = 1; i <= 9; i++) { sum = sum + parseInt(numberToValidate.substring(i - 1, i)) * (11 - i); }

    rest = (sum * 10) % 11;
    if (rest == 10 || rest == 11) { rest = 0; }

    return rest === parseInt(numberToValidate.substring(9, 10)) ? true : false;
  }

  public static validateTwoNumberValidatorCPF(numberToValidate: string) {
    let rest = 0;
    let sum = 0;

    for (let i = 1; i <= 10; i++) { sum = sum + parseInt(numberToValidate.substring(i - 1, i)) * (12 - i); }

    rest = (sum * 10) % 11;
    if (rest == 10 || rest == 11) { rest = 0; }

    return rest === parseInt(numberToValidate.substring(10, 11)) ? true : false;
  }

  public validatorCnpj(value: any): boolean {
    if (!UtilProviderService.isCnpj(value)) { return false; }
    if (!UtilProviderService.validateNumberEqual(value)) { return false; }

    const cnpj = value.toString().replace(/\D/g, '');

    const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    for (let i = 0, n = 0; i < 12; n += cnpj[i] * b[++i]) { }
    if (cnpj[12] != ((n %= 11) < 2 ? 0 : 11 - n)) { return false; }

    for (let j = 0, n2 = 0; j <= 12; n2 += cnpj[j] * b[j++]) { }
    if (cnpj[13] != ((n2 %= 11) < 2 ? 0 : 11 - n2)) { return false; }

    return true;
  }
  public validatorCpf(value: any): boolean {
      if (!UtilProviderService.isCpf(value)) { return false; }
      if (!UtilProviderService.validateNumberEqual(value)) { return false; }

      const cpf = value.replace(/\D/g, '');

      if (!UtilProviderService.validateFirstNumberValidatorCPF(cpf)) { return false; }
      if (!UtilProviderService.validateTwoNumberValidatorCPF(cpf)) { return false; }

      return true;
  }
}
