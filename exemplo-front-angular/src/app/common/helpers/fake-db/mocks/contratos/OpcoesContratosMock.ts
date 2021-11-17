
import faker from 'faker/locale/pt_BR';

export class OpcoesContratosMock {

    public static itens = () => {
        const itens = [];
        if ( undefined === localStorage.getItem('opcaoContratoList') || null === localStorage.getItem('opcaoContratoList')
            || JSON.parse(localStorage.getItem('opcaoContratoList') )?.length === 0) {
            for (let i = 0; i < 20; i++) {
                itens.push({
                    idContrato: faker.random.number({min: 5, max: 100}),
                    cpfCliente: faker.random.arrayElement(['83229850106', '34262795191']),
                    nomeOpcao: faker.random.arrayElement(['Cartão', 'Empréstimos', 'Habitação'])
                });
            }
            itens.push({
                idContrato: '832',
                cpfCliente: '83229850106',
                nomeOpcao: 'Cartão',
            });
        }
        return itens;
    }

    public static item = (id) => {
        return JSON.parse(localStorage.getItem('opcaoContratoList'))[id];
    }
}
