
export class PermissaoManual {

    id: string;
    descricao: string;


    constructor( model) {
        this.id = model.id;
        this.descricao = model.descricao;
    }
}
