
import * as faker from 'faker/locale/pt_BR';
import {Contrato} from '../../../../../main/private/contrato/models/contrato';
import {CondicoesOferecidasMock} from './CondicoesOferecidasMock';
import {ProdutosMock} from './ProdutosMock';
import {ClientesMock} from '../clientes/ClientesMock';
export class ContratosMock {
    public static itens = () => {

        const itens = JSON.parse(localStorage.getItem('contratosList') ) || [];


        const clientes = ClientesMock.itens();

        if ( undefined === itens || null === itens || itens?.length === 0) {
            // @TODO popular os demias atributos
            let cont = 0;
            const totalClientes = (clientes.length - 1) * 2;

            for (let i = 0; i < totalClientes  ; i++) {

                // const randomIndex = faker.random.number(clientes.length - 1);
                cont = (cont > (totalClientes / 2) ) ? 0 : cont;

                const item: Contrato = new Contrato({});

                item.idContrato = faker.random.number({ min: 5, max: 100 }).toString();
                item.cpfCnpj   = clientes[cont].cpfCnpj;
                item.numeroDoContrato = faker.random.number({ min: 5, max: 100 }).toString();
                item.produtoCodigo = 'Produto';
                item.produtoDescricao = 'Descrição do Produto';
                item.produto =  ProdutosMock.item(0);
                item.valorContratado = faker.random.number({min: 1, max: 999999, precision: 2}).toString();
                item.status = faker.random.arrayElement(['A', 'I', 'P']);
                item.prazo = faker.random.number({min: 1, max: 12}).toString();
                item.valorCA = faker.random.number({min: 1, max: 999999, precision: 2}).toString();
                item.valorDividaTotal = faker.random.number({min: 1, max: 999999, precision: 2}).toString();
                item.condicoesOferecidas = CondicoesOferecidasMock.item(0);
                item.diasAtrasoContrato = faker.random.number({min: 1, max: 99999}).toString();
                cont++;
                itens.push(item);
            }

            itens[0].cpfCnpj = '48592007300';
            localStorage.setItem('contratosList', JSON.stringify(itens) );
        }

        return itens;
    }

    public static item = (id) => {
        const itens = ContratosMock.itens();
        return itens[id];
    }
}
