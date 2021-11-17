export class Cep {
   cep: string;
   logradouro: string;
   complemento: string;
   bairro: string;
   cidade: string;
   estado: string;


    /**
     * Constructor
     *
     * @param user
     */
    constructor(cep) {
           this.cep = cep.cep || null;
           this.logradouro = cep.logradouro || null;
           this.complemento = cep.complemento || null;
           this.bairro = cep.bairro || null;
           this.cidade = cep.cidade || null;
           this.estado = cep.estado || null;
    }
}
