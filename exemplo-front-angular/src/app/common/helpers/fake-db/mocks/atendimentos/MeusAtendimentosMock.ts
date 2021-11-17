
import * as faker from 'faker/locale/pt_BR';
import {CoreUtils} from '../../../../../../core/utils/CoreUtils';
import {ClientesMock} from '../clientes/ClientesMock';
export class MeusAtendimentosMock {

    static arrEstados = ['AI', 'DC', 'CS', 'SI', 'AC'];
    static arrPilhaEstados = ['AI', 'DC', 'CS', 'SI', 'AC'];

    public static itens = () => {
        const clientes = ClientesMock.itens();
        const itens = JSON.parse(localStorage.getItem('meus-atendimentosList') ) || [];
        if (undefined === localStorage.getItem('meus-atendimentosList') || null === localStorage.getItem('meus-atendimentosList')
            || JSON.parse(localStorage.getItem('meus-atendimentosList'))?.length === 0) {

            for (let i = 0; i < 20; i++) {
                const randomIndex = faker.random.number(clientes.length - 1);
                const cliente = clientes[randomIndex];
                // const estadoSorteado = faker.random.arrayElement(arrPilhaEstados);
                if ( MeusAtendimentosMock.arrPilhaEstados.length === 0 ) {
                    MeusAtendimentosMock.arrPilhaEstados = MeusAtendimentosMock.arrEstados.slice();
                }
                const estadoSorteado = MeusAtendimentosMock.arrPilhaEstados.pop();

                itens.push(({
                    id: faker.random.number({ min: 1, max: 20 }),
                    chave: CoreUtils.getCurrentUser().id,
                    cpfCnpj: cliente.cpfCnpj,
                    nomeCliente: cliente.nome,
                    situacaoBoleto: faker.random.arrayElement(['Pago', 'Em atraso']),
                    data: faker.date.recent(faker.random.number(100)),
                    situacaoAtendimento: faker.random.arrayElement(['INICIALIZADO', 'FINALIZADO']),
                    estadoAtualAtendimento: estadoSorteado
                }) as any);
            }

            itens[0].cpfCnpj = '48592007300';
            itens[0].estadoAtualAtendimento = 'AC';
            localStorage.setItem('meus-atendimentosList', JSON.stringify(itens));
        }
        return itens;
    }

    public static item = (id) => {
        return JSON.parse(localStorage.getItem('meus-atendimentosList'))[id];
    }



}
