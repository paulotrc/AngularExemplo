export class Email {
    endereco: string;
    sequencial: string;
    operacao: string;

    constructor( model) {
        this.endereco = model.endereco;
        this.sequencial = model.sequencial;
        this.operacao = model.operacao;
    }
}
