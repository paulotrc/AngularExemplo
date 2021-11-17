export class AtendimentoHistorico {

    acao: string;
    dataHora: Date;
    usuario: string;
    descricao: string;


    constructor( model) {
        this.acao = model.acao;
        this.dataHora = model.dataHora;
        this.usuario = model.usuario;
        this.descricao = model.descricao;
    }
}
