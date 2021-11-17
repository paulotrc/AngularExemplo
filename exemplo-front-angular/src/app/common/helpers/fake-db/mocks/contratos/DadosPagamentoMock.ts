import faker from 'faker/locale/pt_BR';
import moment from 'moment';
import {DadosPagamento} from '../../../../../main/private/renegociacao/models/dados-pagamento';

export class DadosPagamentoMock {


    constructor() {
        moment.locale('pt-BR');
        console.log(moment.locale());
    }

    public static itens = () => {
        const itens = JSON.parse(localStorage.getItem('dadosPagamentoList') ) || [];

        function getData() {
            const date = moment(); // Isso aqui, equivale oa Date()
            const dateInFormat = date.format('YYYY.M.D');
            return dateInFormat;
        }

        if ( undefined === itens || null === itens || itens?.length === 0) {
            for (let i = 0; i < 20; i++) {
                const item: DadosPagamento = new DadosPagamento({});
                item.dataVencimento = getData();
                item.juros = faker.random.number(5).toString();
                item.valorDoPagamento = faker.finance.amount(100, 199999, 2).toString();

                itens.push(item);
            }
        }
        localStorage.setItem('dadosPagamentoList', JSON.stringify(itens) );
        return itens;
    }

    public static item = (id) => {
        const itens = DadosPagamentoMock.itens();
        return itens[id];
    }
}
