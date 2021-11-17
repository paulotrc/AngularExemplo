
export class Impedimento {

    id: string;
    descricao: string;

    constructor( model) {
        this.id = model.id;
        this.descricao = model.descricao;
    }
}
