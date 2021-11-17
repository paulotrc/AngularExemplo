export class Telefone {
    tipoTelefone: string;
    numero: string;
    prefixo: string;
    sequencial: string;
    operacao: string;

    constructor( model) {
        this.tipoTelefone   = model.tipoTelefone;
        this.numero         = model.numero;
        this.prefixo        = model.prefixo;
        this.sequencial     = model.sequencial;
        this.operacao       = model.operacao;
    }
}
