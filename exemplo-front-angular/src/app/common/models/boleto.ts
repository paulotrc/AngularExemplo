export class Boleto {

    // public content: string;
    nossoNumero: string;
    valorBoleto: string;
    linhaDigitavel: string;
    dataVencimento: string;
    codigoBarras: string;
    urlBoleto: string;

    constructor(model) {
        this.valorBoleto = model.valorBoleto;
        this.linhaDigitavel = model.linhaDigitavel;
        this.dataVencimento = model.dataVencimento;
        this.nossoNumero = model.nossoNumero;
        this.codigoBarras = model.codigoBarras;
        this.urlBoleto = model.urlBoleto;
    }
}
