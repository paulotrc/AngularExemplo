
import faker from 'faker/locale/pt_BR';

export class ContratoCartaoMock {

    public static itens = () => {
        const itens = [];
        if ( undefined === localStorage.getItem('contratoCartaoList') || null === localStorage.getItem('contratoCartaoList')
            || JSON.parse(localStorage.getItem('contratoCartaoList') )?.length === 0) {
            for (let i = 0; i < 20; i++) {
                itens.push({
                    id: faker.random.number({min: 5, max: 100}),
                    nuContrato: faker.finance.account(18),
                    diasAtraso: faker.random.number(300),
                    totalDivida: faker.finance.amount(100, 199999, 2, '' ),
                });
            }
            itens.push({
                id: faker.random.number({min: 5, max: 100}),
                nuContrato: '123456789987654321',
                diasAtraso: faker.random.number(300),
                totalDivida: faker.finance.amount(100, 199999, 2, '' ),
            });
        }
        return itens;
    }

    public static item = (id) => {
        return JSON.parse(localStorage.getItem('contratoCartaoList'))[id];
    }
}
