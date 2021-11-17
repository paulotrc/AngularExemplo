import * as faker from 'faker/locale/pt_BR';
import {Produto} from '../../../../../main/private/contrato/models/produto';

export class ProdutosMock {
    public static itens = () => {
        const itens = JSON.parse(localStorage.getItem('produtosList') ) || [];
        if ( undefined === itens || null === itens || itens?.length === 0) {

            const item: Produto = new Produto({});
            item.codigo         = faker.random.number(99999999).toString();
            item.descricao      = 'Produto mock ' + faker.hacker.abbreviation();

            for (let i = 0; i < 20; i++) {
                itens.push(item);
            }
            localStorage.setItem('produtosList', JSON.stringify(itens) );
        }
        return itens;
    }

    public static item = (id) => {
        const itens = ProdutosMock.itens();
        return itens[id];
    }
}
