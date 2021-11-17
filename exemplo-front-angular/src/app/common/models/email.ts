export class Email {

    sequencial: string;
    coComunicacao: string;
    tpOperacao: string;
    nuTpComunicacao:number;
    icCorrespondencia:string;
    icPropaganda:string;
    icComprovacao:string;
    icTpMeioComunicacao:number;
    nuFinalidade:number;
    icMeioComunicacao:string;


    constructor( model) {
        this.coComunicacao = model.coComunicacao||'';
        this.sequencial = model.sequencial||'';
        this.tpOperacao = model.tpOperacao||'';
        this.nuTpComunicacao = model.nuTpComunicacao||'';
        this.icCorrespondencia = model.icCorrespondencia||'';
        this.icPropaganda = model.icPropaganda||'';
        this.icComprovacao = model.icComprovacao||'';
        this.icTpMeioComunicacao = model.icTpMeioComunicacao||'';
        this.nuFinalidade = model.nuFinalidade||'';
        this.icMeioComunicacao = model.icMeioComunicacao||'';
    }
}
