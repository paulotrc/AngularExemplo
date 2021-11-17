import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBase} from '../../../../../../common/forms';
import {FormGroup} from '@angular/forms';
import {Cliente} from '../../../models/Cliente';
import {CoreUtils} from 'core/utils/CoreUtils';
import {Telefone} from '../../../../../../common/models/telefone';
import {Email} from '../../../../../../common/models/email';
import {Endereco} from '../../../../../../common/models';



@Component({
    selector: 'siiga-form-clientes',
    templateUrl: './form-dados-cadastrais.component.html',
    styleUrls: ['./form-dados-cadastrais.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CoreUtils.subformComponentProviders(Cliente)]
})
export class FormDadosCadastraisComponent extends FormBase implements OnInit {
    queryParam: string;
    model: Cliente;
    debug = false;

    ngOnInit(): void {
        super.ngOnInit();
        this.model = this.model || new Cliente({});

        /**
         * O Current User SEMPRE será obtido da model dessa tela,
         * quando o fluxo search-clients  for por aqui no state 'AC'.
         **/

        let idAtendimento = this.model.idAtendimento || this.storage.retrieve('idAtendimento');
        this.storage.store('idAtendimento', idAtendimento);
        this.storage.store('currentClient', {nome: this.model.nome, cpfCnpj: this.model.cpfCnpj});
        this.formGroup = this.createForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create model form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup {

        return this.formBuilder.group({
            nome: this.model.nome,
            cpfCnpj: this.model.cpfCnpj,
            idAtendimento: this.storage.retrieve('idAtendimento'),
            enderecosFormFields: [],
            emailsFormFields: [],
            telefonesFormFields: []
        });
    }

    changeState(strState: string, resetChanges = false) {
        if (resetChanges === true) {
            // this.formGroup.reset();
            this.initialize();
        }
        this.state = strState;
    }
// (click)="sendDataOperation('create', 'clientes', 'cliente', 'contratos/search-contratos','','clientes', this.formGroup.value)">

    objConfigDadosCadastrais(extraParamsFromParent: any = null) {
        const obj = {
            action: 'create',
            module: 'cliente',
            serviceName: 'clientes',
            resourcePathAPI: 'clientes',
            returnUrl: 'contratos/search-contratos',
            resourceValue: '',
            extraParams: extraParamsFromParent,
            dataToSend: this.prepareModel(),
            state: 'edit'
        };
        return obj;
    }

    private prepareModel() {

        const telefoneModelo: Telefone = new Telefone({});
        const emailModelo: Email = new Email({});
        const enderecoModelo: Endereco = new Endereco({});

        const telefones = this.ajustarFormGroupNovosTelefones(telefoneModelo);
        const emails = this.ajustarFormGroupNovosEmails(emailModelo);
        const enderecos = this.ajustarFormGroupNovosEnderecos(enderecoModelo);

        return {
            id: this.storage.retrieve('idAtendimento'),
            idAtendimento: this.storage.retrieve('idAtendimento'),
            nome: this.formGroup.get('nome').value,
            cpfCnpj: this.formGroup.get('cpfCnpj').value,
            enderecos,
            emails,
            telefones
        };
    }

    private ajustarFormGroupNovosTelefones(telefoneModelo: Telefone): Telefone[] {
        const telefones = [];
        if (this.formGroup.get('telefonesFormFields').value === null || this.formGroup.get('telefonesFormFields').value === undefined) {
            return null;
        }
        this.model.telefones.forEach(item => {
            item.tpOperacao = 'E';
            telefones.push(item);
        });

        if (this.formGroup.get('telefonesFormFields').value!==null) {
            this.formGroup.get('telefonesFormFields').value.telefones.forEach(itemForField => {
                telefoneModelo = new Telefone({});
                telefoneModelo.coComunicacao = itemForField;
                telefoneModelo.sequencial = '0';
                telefoneModelo.tpOperacao = 'I';
                telefoneModelo.icComprovacao = this.model.telefones[0] === undefined ? 'N' : this.model.telefones[0].icComprovacao;
                telefoneModelo.icCorrespondencia = this.model.telefones[0] === undefined ? '' : this.model.telefones[0].icCorrespondencia;
                telefoneModelo.icPropaganda = this.model.telefones[0] === undefined ? 'N' : this.model.telefones[0].icPropaganda;
                telefoneModelo.nuFinalidade = this.model.telefones[0] === undefined ? 1 : this.model.telefones[0].nuFinalidade;
                telefoneModelo.nuTpComunicacao = this.model.telefones[0] === undefined ? 1 : this.model.telefones[0].nuTpComunicacao;
                telefoneModelo.nuTpTel = this.model.telefones[0] === undefined ? 'FIXO' : this.model.telefones[0].nuTpTel;
                telefoneModelo.prefixo = itemForField.toString().substring(0, 2);

                telefones.push(telefoneModelo);
            });
        }
        
        return telefones;
    }

    private ajustarFormGroupNovosEmails(emailModelo: Email): Email[] {
        const emails = [];
        if (this.formGroup.get('emailsFormFields').value === null || this.formGroup.get('emailsFormFields').value === undefined) {
            return null;
        }
        this.model.emails.forEach(item => {
            item.tpOperacao = 'E';
            emails.push(item);
        });
        if (this.formGroup.get('emailsFormFields').value !== null) {
            this.formGroup.get('emailsFormFields').value.emails.forEach(itemForField => {
                emailModelo = new Email({});
                emailModelo.coComunicacao = itemForField;
                emailModelo.sequencial = '0';
                emailModelo.tpOperacao = 'I';
                emailModelo.nuTpComunicacao =
                    this.model.emails[0] === undefined ? 2 : this.model.emails[0].nuTpComunicacao;
                emailModelo.icCorrespondencia =
                    this.model.emails[0] === undefined ? '' : this.model.emails[0].icCorrespondencia;
                emailModelo.icPropaganda = this.model.emails[0] === undefined ? 'N' : this.model.emails[0].icPropaganda;
                emailModelo.icComprovacao =
                    this.model.emails[0] === undefined ? 'N' : this.model.emails[0].icComprovacao;
                emailModelo.icTpMeioComunicacao =
                    this.model.emails[0] === undefined ? 0 : this.model.emails[0].icTpMeioComunicacao;
                emailModelo.nuFinalidade = this.model.emails[0] === undefined ? 1 : this.model.emails[0].nuFinalidade;
                emailModelo.icMeioComunicacao =
                    this.model.emails[0] === undefined ? 'N' : this.model.emails[0].icMeioComunicacao;

                emails.push(emailModelo);
            });
        }
        return emails;
    }

    private ajustarFormGroupNovosEnderecos(enderecoModelo: Endereco): Endereco[] {
        const enderecos = [];
        if(this.formGroup.get('enderecosFormFields').value === null || this.formGroup.get('enderecosFormFields').value === undefined){
            return null;
        }
        this.model.enderecos.forEach(item => {
            item.tpOperacao = 'E';
            item.numero = (item.numero === null || item.numero === undefined ? '' : item.numero);
            enderecos.push(item);
        });
            this.formGroup.get('enderecosFormFields').value.enderecos.forEach(itemForField => {
                enderecoModelo = new Endereco({});

                enderecoModelo.sequencial = '0';
                enderecoModelo.bairro = itemForField.bairro;
                enderecoModelo.cep = itemForField.cep;
                enderecoModelo.cepComplemento = this.model.enderecos[0] === undefined
                    ? itemForField.complemento
                    : this.model.enderecos[0].complemento;
                enderecoModelo.complemento = itemForField.complemento;
                enderecoModelo.icComprovacao =
                    this.model.enderecos[0] === undefined ? 'N' : this.model.enderecos[0].icComprovacao;
                enderecoModelo.icCorrespondencia = this.model.enderecos[0] === undefined
                    ? 'N'
                    : this.model.enderecos[0].icCorrespondencia;
                enderecoModelo.logradouro = itemForField.logradouro;
                enderecoModelo.nomeLocalidade = itemForField.cidade;
                enderecoModelo.nuFinalidade =
                    this.model.enderecos[0] === undefined ? '1' : this.model.enderecos[0].nuFinalidade;
                enderecoModelo.nuLocalidade =
                    this.model.enderecos[0] === undefined ? '' : this.model.enderecos[0].nuLocalidade;
                enderecoModelo.numero = itemForField.numero;
                enderecoModelo.tpOperacao = 'I';
                enderecoModelo.uf = itemForField.uf;
                enderecoModelo.tpEndereco =
                    this.model.enderecos[0] === undefined ? 'N' : this.model.enderecos[0].tpEndereco;
                enderecoModelo.mesReferencia = this.model.enderecos[0] === undefined
                    ? (new Date().getUTCMonth() + 1).toString()
                    : this.model.enderecos[0].mesReferencia;
                enderecoModelo.anoReferencia = this.model.enderecos[0] === undefined
                    ? (new Date().getUTCFullYear()).toString()
                    : this.model.enderecos[0].anoReferencia;

                enderecos.push(enderecoModelo);
            });
        
        return enderecos;
    }

}
