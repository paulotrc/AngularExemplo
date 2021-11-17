import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {DadosBoleto} from '../../models/dados-boleto';
import jsPDF from 'jspdf-yworks';
import html2canvas from 'html2canvas';


/*

  dadosBoleto.identificacao + '<br>' +
   (dadosBoleto.cpfCnpj) ? dadosBoleto.cpfCnpj : '' + '<br>' +
  dadosBoleto.endereco + '<br>' +
  dadosBoleto.cidadeUf + '<br>' }}


 */

@Component({
    selector: 'boleto-caixa',
    templateUrl: './boleto.component.html',
    styleUrls: ['./boleto.component.scss']
})
export class BoletoComponent implements OnInit {

    objBoleto: any;
    displayString: any;

    @Input()
    dadosBoleto: DadosBoleto;

    dataVencimento: string;
    dadosEmpresa: any;

    constructor(
        private pRouter: Router,
        private domSanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        // this.generateBoleto();
        //this.dadosBoleto = new DadosBoleto();
       //this.model = this.model || new DadosBoleto();
       //this.dadosBoleto.linhaDigitavel = '10499.00127 00200.001287 70000.000128 1 10990000016000';

    }

    generateBoleto() {
        // this.dadosBoleto = new DadosBoleto();
        //
        // this.dadosBoleto.identificacao = 'identificao xx';
        // this.dadosBoleto.dadosCadastrais.cpfCnpj = '83229850106';
        // this.dadosBoleto.endereco = 'Rua dos Bobos Número Zero';
        // this.dadosBoleto.cidadeUf = 'DF';
        // this.dadosBoleto.dadosCadastrais.codigoBancoComDv = '104-0';
        // this.dadosBoleto.linhaDigitavel = '10499.00127 00200.001287 70000.000128 1 10990000016000';
        // this.dadosBoleto.dadosCadastrais.cedente = 'FrogDevs - SA';
        // this.dadosBoleto.dadosCadastrais.agenciaCodigo = '0345-0';
        // this.dadosBoleto.dadosCadastrais.especie = 'R$';
        // this.dadosBoleto.dadosCadastrais.especieDocumento = '';
        // this.dadosBoleto.dadosCadastrais.quantidade = '1';
        // this.dadosBoleto.nossoNumero = '000000666-2020';
        // this.dadosBoleto.dadosCadastrais.numeroDocumento = '1999666';
        // this.dadosBoleto.dataVencimento = '01/01/2030';
        // this.dadosBoleto.dadosCadastrais.valorBoleto = '1.999,99';
        // this.dadosBoleto.dadosCadastrais.sacado = 'Fulano da Silva';
        // this.dadosBoleto.dadosCadastrais.demonstrativo1 = 'demosntrativo 1xxxxx ';
        // this.dadosBoleto.dadosCadastrais.demonstrativo2 = 'demosntrativo 2xxxxx ';
        // this.dadosBoleto.dadosCadastrais.demonstrativo3 = 'demosntrativo 3xxxxx ';
        // this.dadosBoleto.codigoBarras = '10499.0012700200.00128770000.000128110990000016000';
        // this.dadosBoleto.dadosCadastrais.descontoAbatimento = '';
        // this.dadosBoleto.dadosCadastrais.outrasDeducoes = '';
        // this.dadosBoleto.dadosCadastrais.multaMora = '';
        // this.dadosBoleto.dadosCadastrais.outrosAcrescimos = '';
        // this.dadosBoleto.dadosCadastrais.valorCobrado = '';
        // this.dadosBoleto.dadosCadastrais.localPagamento = 'Pagável em qualquer Banco até o vencimento';
        // this.dadosBoleto.dadosCadastrais.usoBanco = '';

      /*  this.pBoletoService.getOne(1).subscribe((data) => {
            this.displayString = this.domSanitizer.bypassSecurityTrustHtml(this.b64DecodeUnicode(data.content));
        });*/
    }

    b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(  (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }


    fbarcode(codigoBarras: any) {

    }
    printPage() {
        window.print();
    }
    
    public convetToPDF(nossoNum) {
        const data = document.getElementById('contentToConvert');


        html2canvas(data).then(canvas => {
            const imgWidth = 208;
            const imgHeight = canvas.height * imgWidth / canvas.width;

            const contentDataURL = canvas.toDataURL('image/png');

            const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
            const position = 0;
            pdf.setDisplayMode(1, 'continuous', 'UseOutlines');
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.save(nossoNum+'.pdf'); // Generated PDF
        });
    }
}
