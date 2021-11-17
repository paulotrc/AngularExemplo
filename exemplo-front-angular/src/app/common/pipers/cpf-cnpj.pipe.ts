import {Pipe, PipeTransform} from '@angular/core';
import {CoreUtils} from "../../../core/utils/CoreUtils";

@Pipe({
  name: 'cpfCnpjMask'
})
export class CpfCnpjPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
      const cnpjCpf = value.replace(/\D/g, '');

      if (cnpjCpf.length === 11) {
          return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
      }
      return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
  }
}
