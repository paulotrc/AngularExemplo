import {Pipe, PipeTransform} from '@angular/core';
import {CoreUtils} from "../../../core/utils/CoreUtils";

@Pipe({
  name: 'realCurrency'
})
export class RealCurrencyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
      let result = CoreUtils.getFormattedPrice(Number(value)).toString();
      return result;
  }
}
