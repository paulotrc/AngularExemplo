
// @ts-ignore
import * as faker from 'faker/locale/pt_BR';
import {Cliente} from '../../../../../main/private/cliente/models/Cliente';
import {Telefone} from '../../../../models/telefone';
import {Email} from '../../../../models/email';
import {EnderecosMock} from './EnderecosMock';
import {CPFUtil} from '../../../../../../core/utils/CPFUtil';
export class ClientesMock {
    public static itens = () => {

            const itens = JSON.parse(localStorage.getItem('clientesList') ) || [];

            if ( undefined === localStorage.getItem('clientesList') || null === localStorage.getItem('clientesList')
            || JSON.parse(localStorage.getItem('clientesList') )?.length === 0) {
                for (let i = 0; i < 20; i++) {
                    const model = new Cliente({});
                    const telefone = new Telefone({});
                    const email = new Email({});
                    email.coComunicacao = faker.internet.email();
                    const email2 = new Email({});
                    email2.coComunicacao = faker.internet.email();

                    telefone.coComunicacao = faker.random.number(999999999).toString();
                    telefone.tpOperacao = faker.random.arrayElement(['A', 'I', 'E']);
                    telefone.prefixo = faker.random.number(99).toString();
                    telefone.sequencial = faker.random.number(9999).toString();
                    telefone.nuTpTel = faker.random.arrayElement(['FIXO', 'CELULAR']);

                    model.nome              = 'Cliente mock ' + faker.name.firstName();
                    model.cpfCnpj           = CPFUtil.gerarCpf(true);
                    model.idAtendimento     = faker.random.number({min: 5, max: 100});
                    model.telefones         = [ telefone ];
                    model.emails            = [ email, email2 ];
                    model.enderecos         = EnderecosMock.itens();

                    itens.push(model);
            }

                itens[0].cpfCnpj = '48592007300';
                localStorage.setItem('clientesList', JSON.stringify(itens));

        }
            const teste = itens[0];
            return itens;
    }

    public static item = (id) => {
        const itens = ClientesMock.itens();
        return itens[id];
    }
}
