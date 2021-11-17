import {DadosPagamento} from './dados-pagamento';
import {Contrato} from '../../contrato/models/contrato';

export class ResumoAtendimentoRenegociacaoContrato {

    idAtendimento: number;
    listaDeContrato: Contrato[];
    dadosPagamento: DadosPagamento;

    constructor( model) {
        this.idAtendimento      = model.idAtendimento;
        this.listaDeContrato    = model.listaDeContrato || [];
        this.dadosPagamento     = model.dadosPagamento || new DadosPagamento({});
    }
}
