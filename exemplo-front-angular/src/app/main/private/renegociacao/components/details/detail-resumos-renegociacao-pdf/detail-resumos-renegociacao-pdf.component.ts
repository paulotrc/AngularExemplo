
import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { FormBase } from '@form';
import { ResumoAtendimentoRenegociacaoContrato } from 'app/main/private/renegociacao/models/resumo-atendimento-renegociacao-contrato';
import { Cliente } from 'app/main/private/cliente/models/Cliente';
import jsPDF from 'jspdf-yworks';
import html2canvas from 'html2canvas';

@Component({
    selector: 'siiga-detail-resumos-renegociacao-pdf',
    templateUrl: './detail-resumos-renegociacao-pdf.component.html',
    styleUrls: ['./detail-resumos-renegociacao-pdf.component.scss'],
})

export class DetailResumosRenegociacaoPdfComponent extends FormBase implements OnInit, OnDestroy {

    model: ResumoAtendimentoRenegociacaoContrato;
    totalizadosDivida = 0;
    dateNow: any;
    dadosCliente: Cliente = new Cliente({});

    ngOnInit(): void {
        super.ngOnInit();
        this.dateNow = new Date();
        this.model = this.dialogData.model;

        this.coreConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        this.model.listaDeContrato.forEach(itemListaContrato => {
            this.totalizadosDivida += +itemListaContrato.valorContratado;
        });
    }

    public convetToPDF(atendimento) {
        const data = document.getElementById('resumo');
        html2canvas(data).then(canvas => {
            // Few necessary setting options
            const imgWidth = 208;
            const imgHeight = canvas.height * imgWidth / canvas.width;

            const contentDataURL = canvas.toDataURL('image/png');

            const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
            const position = 0;
            pdf.setDisplayMode(1, 'continuous', 'UseOutlines');
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.save(atendimento+'-resumo.pdf'); // Generated PDF
        });
    }
    
}
