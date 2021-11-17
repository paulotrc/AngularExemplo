
import * as faker from 'faker/locale/pt_BR';
import {CondicoesOferecidas} from '../../../../../main/private/contrato/models/condicoes-oferecidas';
import moment from 'moment';

export class CondicoesOferecidasMock {
    public static itens = () => {
        const itens = JSON.parse(localStorage.getItem('condicoesOferecidasList') ) || [];

        if ( undefined === itens || null === itens || itens?.length === 0) {

            for (let i = 0; i < 20; i++) {

                const item: CondicoesOferecidas = new CondicoesOferecidas({});
                item.valorMinimo         = faker.finance.amount( 5,  100, 2);
                item.valorNegociado      = faker.finance.amount( 5,  100, 2);
                item.desconto            = faker.finance.amount(5, 100, 2);
                item.valorDoPagamento    = faker.finance.amount( 5, 100,  2);
                item.juros               = faker.finance.amount(5,  100,  2);
                item.dataPagamento       = faker.date.future().toLocaleDateString();

                itens.push(item);
            }
            localStorage.setItem('condicoesOferecidasList', JSON.stringify(itens) );
        }
        return itens;
    }

    public static item = (id) => {
        const itens = CondicoesOferecidasMock.itens();
        return itens[id];
    }
}
