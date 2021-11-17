export class Endereco {

    sequencial: string;
    bairro: string;
    cep: string;
    cepComplemento: string;
    complemento: string;
    icComprovacao: string;
    icCorrespondencia: string;
    logradouro: string;
    nomeLocalidade: string;
    nuFinalidade: string;
    nuLocalidade: string;
    numero: string;
    tpOperacao: string;
    uf: string;
    tpEndereco: string;
    mesReferencia: string;
    anoReferencia: string;

    constructor( model) {
        this.sequencial = model.sequencial || null ;
        this.anoReferencia = model.anoReferencia || null ;
        this.bairro = model.bairro || null ;
        this.cep = model.cep || null ;
        this.cepComplemento = model.cepComplemento || null ;
        this.complemento = model.complemento || null ;
        this.icComprovacao = model.icComprovacao || null ;
        this.icCorrespondencia = model.icCorrespondencia || null ;
        this.logradouro = model.logradouro || null ;
        this.mesReferencia = model.mesReferencia || null ;
        this.nomeLocalidade = model.nomeLocalidade || null ;
        this.nuFinalidade = model.nuFinalidade || null ;
        this.nuLocalidade = model.nuLocalidade || null ;
        this.numero = model.numero || null ;
        this.tpOperacao = model.tpOperacao || null ;
        this.tpEndereco = model.tpEndereco || null ;
        this.uf = model.uf || null ;
    }
}
