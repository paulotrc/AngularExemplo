import { Telefone } from '../../../../common/models/telefone';
import { Email } from '../../../../common/models/email';
import { Endereco } from '../../../../common/models/endereco';

export class Cliente {

    nome: string;
    cpfCnpj: string;
    idAtendimento: number;
    telefones: Telefone[];
    emails: Email[];
    enderecos: Endereco[];


    constructor( model) {
        this.nome = model.nome;
        this.cpfCnpj = model.cpfCnpj;
        this.idAtendimento = model.idAtendimento;
        this.telefones      = model.telefones;
        this.emails = model.emails;
        this.enderecos = model.enderecos;
    }
}
