
import * as faker from 'faker/locale/pt_BR';
export class BoletosMock {
    public static itens = () => {
            const itens = [];
            if ( undefined === localStorage.getItem('boletosList') || null === localStorage.getItem('boletosList')
            || JSON.parse(localStorage.getItem('boletosList') )?.length === 0) {
                for (let i = 0; i < 20; i++) {
                    itens.push({
                        nossoNumero: faker.random.number({min: 5, max: 100}),
                        valorBoleto: faker.finance.amount(100, 50000, 2 , ''),
                        linhaDigitavel: '99999999999999999999999999999999999999999999999',
                        dataVencimento: faker.date.recent(),
                        codigoBarras: '99999999999999999999999999999999999999999999999',
                        urlBoleto: 'http://iga-api/boleto/boleto=99999999999999999999999999999999999999999999999',
                    });
            }
        }
            return itens;
    }

    public static item = (id) => {
        return JSON.parse(localStorage.getItem('boletosList'))[id];
    }
}
