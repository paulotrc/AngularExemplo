import {Validator} from './validator';

export function notNull(target: any, propertyKey: string) {
    Validator.registerNotNull(target, propertyKey);
}
