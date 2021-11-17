export class Atendimento {

    id: number;
    chave: string;
    cpfCnpj: string;
    nomeCliente: string;
    situacaoBoleto: string;
    data: string;
    situacaoAtendimento: string;
    estadoAtualAtendimento: string;

    constructor( model) {
        this.id = model.id;
        this.chave = model.chave;
        this.cpfCnpj = model.cpfCnpj;
        this.nomeCliente = model.nomeCliente;
        this.situacaoBoleto = model.situacaoBoleto;
        this.data = model.data;
        this.situacaoAtendimento = model.situacaoAtendimento;
        this.estadoAtualAtendimento = model.estadoAtualAtendimento;
    }
}
