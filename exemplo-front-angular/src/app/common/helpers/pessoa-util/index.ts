import * as Joi from '@hapi/joi';
import cpf from './cpf-util';
import cnpj from './cnpj-util';

export { cpf, cnpj };

export default {
    base: Joi.string(),
    name: 'document',
    language: {
        cnpj: 'informado é inválido',
        cpf: 'informado é inválido'
    },
    rules: [{
        name: 'cnpj',
        validate(params: any, value: string, state: any, options: any) {
            if (!cnpj.isValid(value)) {
                return this.createError('document.cnpj', { v: value }, state, options);
            }

            return value;
        }
    }, {
        name: 'cpf',
        validate(params: any, value: string, state: any, options: any) {
            if (!cpf.isValid(value)) {
                return this.createError('document.cpf', { v: value }, state, options);
            }

            return value;
        }
    }]
};
