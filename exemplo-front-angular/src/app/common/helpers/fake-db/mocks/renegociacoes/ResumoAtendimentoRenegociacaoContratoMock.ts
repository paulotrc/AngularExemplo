import * as faker from 'faker/locale/pt_BR';
import {ContratosMock} from '../contratos/ContratosMock';
import {DadosPagamentoMock} from '../contratos/DadosPagamentoMock';
import {ResumoAtendimentoRenegociacaoContrato} from '../../../../../main/private/renegociacao/models/resumo-atendimento-renegociacao-contrato';

export class ResumoAtendimentoRenegociacaoContratoMock {

    public static itens = () => {
        const itens = JSON.parse(localStorage.getItem('resumoAtendimentoRenegociacaoContratoList') ) || [];

        if ( undefined === itens || null === itens || itens?.length === 0) {
            for (let i = 1; i < 21; i++) {
                const item: ResumoAtendimentoRenegociacaoContrato = new ResumoAtendimentoRenegociacaoContrato({});
                item.listaDeContrato = ContratosMock.itens();
                item.idAtendimento = i;
                item.dadosPagamento = DadosPagamentoMock.item(0);
                // for (let i = 0; i < 1; i++) { // Sempre será UM, segundo a API.
                itens.push(item);
               // }

            }
        }

        localStorage.setItem('resumoAtendimentoRenegociacaoContratoList', JSON.stringify(itens));
        return itens;
    }

    public static item = (id) => {
        const itens = ResumoAtendimentoRenegociacaoContratoMock.itens();
        return itens[id];
    }
}
