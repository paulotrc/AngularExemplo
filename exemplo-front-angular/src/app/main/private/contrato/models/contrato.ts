import {CondicoesOferecidas} from './condicoes-oferecidas';
import {Produto} from './produto';
import {Id} from '../../../../../core/decorators/id';
import {CoreModel} from '../../../../../core/decorators/core-model-class';

export class Contrato {

    idContrato: string;
    cpfCnpj: string;
    numeroDoContrato: string;
    produtoCodigo: string;
    produtoDescricao: string;
    produto: Produto;
    valorContratado: string;
    status: string;
    prazo: string;
    valorCA: string;
    valorDividaTotal: string;
    condicoesOferecidas: CondicoesOferecidas;
    diasAtrasoContrato: string;


    constructor(model) {
        // this.nomeCliente            = model.nomeCliente;
        this.cpfCnpj                = model.cpfCnpj || '';
        this.numeroDoContrato       = model.numeroDoContrato || '';
        this.produtoCodigo          = model.produtoCodigo || '';
        this.produtoDescricao       = model.produtoDescricao || '';
        this.produto                = model.produto;
        this.valorContratado        = model.valorContratado || '';
        this.status                 = model.status || '';
        this.prazo                  = model.prazo || '';
        this.valorCA                = model.valorCA || '';
        this.valorDividaTotal       = model.valorDividaTotal || '';
        this.idContrato             = model.idContrato || '';
        this.condicoesOferecidas    = model.condicoesOferecidas || '';
        this.diasAtrasoContrato     = model.diasAtrasoContrato || '';
    }

}
