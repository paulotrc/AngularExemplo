export class Endereco {

    sequencial: string;
    anoReferencia: string;
    bairro: string;
    cep: string;
    cepComplemento: string;
    complemento: string;
    icComprovacao: string;
    icCorrespondencia: string;
    logradouro: string;
    mesReferencia: string;
    nomeLocalidade: string;
    nuFinalidade: string;
    nuLocalidade: string;
    numero: string;
    tpOperacao: number;
    tpEndereco: string;
    uf: string;

    constructor( model) {
        this.sequencial = model.sequencial;
        this.anoReferencia = model.anoReferencia;
        this.bairro = model.bairro;
        this.cep = model.cep;
        this.cepComplemento = model.cepComplemento;
        this.complemento = model.complemento;
        this.icComprovacao = model.icComprovacao;
        this.icCorrespondencia = model.icCorrespondencia;
        this.logradouro = model.logradouro;
        this.mesReferencia = model.mesReferencia;
        this.nomeLocalidade = model.nomeLocalidade;
        this.nuFinalidade = model.nuFinalidade;
        this.nuLocalidade = model.nuLocalidade;
        this.numero = model.numero;
        this.tpOperacao = model.tpOperacao;
        this.tpEndereco = model.tpEndereco;
        this.uf = model.uf;
    }
}
