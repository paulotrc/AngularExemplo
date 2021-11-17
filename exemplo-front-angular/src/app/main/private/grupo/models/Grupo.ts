import { SituacaoEspecial } from '../../situacao-especial/models/SituacaoEspecial';

export class Grupo {

    id: number;
    descricao: string;
    excluido: string;
    dataExclusao: string;
    situacaoEspecialList: SituacaoEspecial[];


    constructor( model) {
        this.id = model.id;
        this.descricao = model.descricao;
        this.dataExclusao = model.dataExclusao;
        this.situacaoEspecialList = model.situacaoEspecialList;
    }
}
