
export class SituacaoEspecial {

    id: string;
    descricao: string;
    grupo: number;
    grupoDescricao: string;
    observacao: string;
    excluido:string;
    dataExclusao: string;
    impedimentos : [];
    perfilInclusaoManualList:[];


    constructor( model) {
        this.id = model.id;
        this.descricao = model.descricao;
        this.grupo = model.grupo;
        this.observacao = model.observacao;
        this.excluido = model.excluido;
        this.dataExclusao = model.dataExclusao;
        this.impedimentos = model.impedimentos || [];
        this.perfilInclusaoManualList = model.perfilInclusaoManualList || [];
    }
}
