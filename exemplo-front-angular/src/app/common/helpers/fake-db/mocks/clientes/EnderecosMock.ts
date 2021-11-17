import * as faker from 'faker/locale/pt_BR';
import {Endereco} from '../../../../../common/models/endereco';

export class EnderecosMock {
    public static itens = () => {
            const itens = [];
            if ( undefined === localStorage.getItem('enderecosList') || null === localStorage.getItem('enderecosList')
            || JSON.parse(localStorage.getItem('enderecosList') )?.length === 0) {
                for (let i = 0; i < 2; i++) {
                    const model = new Endereco({});
                    model.sequencial = faker.random.number(9999).toString();
                    model.bairro =  faker.address.streetName();
                    model.cep = faker.address.zipCode();
                    model.cepComplemento = faker.random.number(({min: 100, max: 999, precision: 1})).toString();
                    model.complemento =  faker.address.streetSuffix();
                    model.icComprovacao =  faker.random.arrayElement(['S', 'N']);
                    model.icCorrespondencia = faker.random.arrayElement(['S', 'N', 'U']);
                    model.logradouro =  faker.address.secondaryAddress();
                    model.nomeLocalidade = faker.address.city();
                    model.nuFinalidade = faker.random.number(9).toString();
                    model.nuLocalidade = faker.random.number(999999).toString();
                    model.numero = '' + faker.random.number(100);
                    model.tpOperacao = faker.random.arrayElement(['A', 'I', 'E']);
                    model.uf = 'Cliente mock ' + faker.address.cityPrefix();
                    model.tpEndereco = faker.random.arrayElement(['G', 'P']);
                    model.mesReferencia = faker.random.number(({min: 1, max: 12, precision: 1})).toString();
                    model.anoReferencia = faker.random.number(({min: 2000, max: 2020, precision: 1})).toString();

                    itens.push(model);
            }
        }
            return itens;
    }

    public static item = (id) => {
        return JSON.parse(localStorage.getItem('enderecosList'))[id];
    }
}
