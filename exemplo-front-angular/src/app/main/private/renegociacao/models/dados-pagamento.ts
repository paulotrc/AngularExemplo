export class DadosPagamento {

    valorDoPagamento: string;
    juros: string;
    dataVencimento: string;


    constructor( model) {
        this.valorDoPagamento   = model.valorDoPagamento;
        this.juros              = model.juros;
        this.dataVencimento     = model.dataVencimento;
    }
}
