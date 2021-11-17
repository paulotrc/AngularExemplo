import {Telefone} from '../../../../common/models/telefone';
import {Email} from '../../../../common/models/email';
import {Endereco} from '../../../../common/models/endereco';

export class Cliente {

    cpfCnpj: string;
    nome: string;
    idAtendimento: number; // @todo Atendimento ID não deve ser um atributo da entidade Cliente.
    telefones: Telefone[];
    emails: Email[];
    enderecos: Endereco[];

    ufAtual: string;
    bairroAtual: string;
    cidadeAtual: string;
    emailAtual: string;
    telefoneAtual: string;


    constructor( model) {
        this.cpfCnpj =        model.cpfCnpj;
        this.nome =           model.nome;
        this.idAtendimento =  model.idAtendimento;
        this.telefones =      model.telefones;
        this.emails =         model.emails;
        this.enderecos =      model.enderecos;
    }
}
