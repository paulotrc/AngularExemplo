
export class CondicoesOferecidas {

    valorMinimo: string;
    valorNegociado: string;
    desconto: string;
    valorDoPagamento: string;
    juros: string;
    dataPagamento: string;

    constructor( model) {
        this.valorMinimo         = model.valorMinimo;
        this.valorNegociado      = model.valorNegociado || 0;
        this.desconto            = model.desconto || 0;
        this.valorDoPagamento    = model.valorDoPagamento || 0;
        this.juros               = model.juros || 0;
        this.dataPagamento       = model.dataPagamento || 0;
    }
}
