
export class Produto {

    codigo: string;
    descricao: string;

    constructor( model) {
        this.codigo         = model.codigo;
        this.descricao      = model.descricao;
    }
}
