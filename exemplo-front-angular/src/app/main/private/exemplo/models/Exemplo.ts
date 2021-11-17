import {Validators} from '@angular/forms';

export class Exemplo{
    id: any;
    titulo: string;
    codigoReceita: string;
    objetivo: string;
    cargaHoraria: any;
    valor: any;
    preRequisito: string;
    publicoAlvo: any;
    documentosObrigatorios: string;
    resultadoEsperado: string;
    conteudoProgramatico: string;
    modalidade: any;
    liberarComprarVoucher: any;
    status: any;
    starred: any;
    ano: any;

    constructor(model) {
        this.id = model.id;
        this.codigoReceita = model.codigoReceita;
        this.titulo = model.titulo;
        this.objetivo = model.objetivo;
        this.cargaHoraria = model.cargaHoraria;
        this.valor = model.valor;
        this.preRequisito = model.preRequisito;
        this.publicoAlvo = model.publicoAlvo;
        this.documentosObrigatorios = model.documentosObrigatorios;
        this.resultadoEsperado = model.resultadoEsperado;
        this.conteudoProgramatico = model.conteudoProgramatico;
        this.modalidade = model.modalidade;
        this.liberarComprarVoucher = model.liberarComprarVoucher;
        this.status = model.status;
        this.starred = model.starred;
        this.ano = model.ano;
    }
}
