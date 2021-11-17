import {CurrencyMaskConfig} from 'ngx-currency';

export class CurrencyConfig implements CurrencyMaskConfig {
    prefix = 'R$ ';
    suffix = '';
    thousands = '.';
    decimal = ',';
    nullable = true;
    align = 'right';
    allowNegative = false;
    allowZero = true;
    precision = 2;
}
