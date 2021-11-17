import {DadosCadastrais} from "./dados-cadastrais";

export class DadosBoleto {
    linhaDigitavel: string;
    dataVencimento: string;
    nossoNumero: string;
    codigoBarras: string;
    urlBoleto: string;
    valoBoleto: string;
    dadosCadastrais: DadosCadastrais;
    identificacao: string;
    endereco: string;
    cidadeUf: string;

    constructor(model) {
        this.linhaDigitavel = model.linhaDigitavel;
        this.dataVencimento = model.dataVencimento;
        this.nossoNumero = model.nossoNumero;
        this.codigoBarras = model.codigoBarras;
        this.urlBoleto = model.urlBoleto;
        this.dadosCadastrais = model.dadosCadastrais;
        this.identificacao = model.identificacao;
        this.endereco = model.endereco;
        this.cidadeUf = model.cidadeUf;
    }
}
