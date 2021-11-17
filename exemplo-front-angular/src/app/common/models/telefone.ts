export class Telefone {
    coComunicacao: string;
    icComprovacao:string;
    icCorrespondencia:string;
    icPropaganda:string;
    nuFinalidade:number;
    nuTpComunicacao:number;
    nuTpTel:string;
    prefixo: string;
    sequencial: string;
    tpOperacao: string;

    constructor( model) {
        this.coComunicacao      = model.coComunicacao;
        this.icComprovacao      = model.icComprovacao;
        this.icCorrespondencia  = model.icCorrespondencia;
        this.icPropaganda       = model.icPropaganda;
        this.nuFinalidade       = model.nuFinalidade;
        this.nuTpComunicacao    = model.nuTpComunicacao;
        this.nuTpTel            = model.nuTpTel;
        this.prefixo            = model.prefixo;
        this.sequencial         = model.sequencial;
        this.tpOperacao         = model.tpOperacao;
    }
}
