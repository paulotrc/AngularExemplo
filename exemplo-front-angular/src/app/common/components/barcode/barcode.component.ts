import {Component, Input, OnInit} from '@angular/core';
import {BarcodeSVG} from './BarcodeSVG';

@Component({
    selector: 'draw-barcode',
    templateUrl: './barcode.component.html',
    styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

    @Input()
    set barcodeSequence(value) {
       this.generateBarcodeSequence(value);
    }

    get sequence(): string {
        return this.pSequence;
    }


    set sequence(value: string) {
        this.pSequence = value;
    }

    constructor() {
    }


    /**
     * Representations of each decimal digit
     *
     * @default
     * @constant
     */
    static WEIGHTS: string[] = [
        '11221', // 0
        '21112', // 1
        '12112', // 2
        '22111', // 3
        '11212', // 4
        '21211', // 5
        '12211', // 6
        '11122', // 7
        '21121', // 8
        '12121', // 9
    ];

    /**
     * Representation of Start portion of the barcode
     *
     * @default
     * @constant
     */
    static START = '1111';

    /**
     * Representation of Stop portion of the barcode
     *
     * @default
     * @constant
     */
    static STOP = '211';
    private bankSlipNumber: any;

  private pSequence: string;

    /**
     * Converts a pair of digits into their ITF representation and interleave them
     *
     * @param {String} pair The pair to be interleaved
     * @return {String} The input pair encoded into its ITF representation
     *
     * @example
     * // Returns "1211212112"
     * ITF.interleavePair('01');
     */
    interleavePair(pair) {
        const black = BarcodeComponent.WEIGHTS[Math.floor(pair / 10)];
        const white = BarcodeComponent.WEIGHTS[pair % 10];

        let p = '';

        for (let i = 0; i < 5; i += 1) {
            p += black[i];
            p += white[i];
        }

        return p;
    }

    /**
     * Encodes a base-10 number into its Interleaved 2 of 5 (ITF) representation
     *
     * @param {String} number The number to be encoded
     * @return {String} The input number encoded into its ITF representation
     *
     * @example
     * // Returns "111121121111222121121112211222111112111122211121122211211"
     * ITF.encode('1234567890');
     */
    encode( pNumber) {
        return BarcodeComponent.START + pNumber.match(/(..?)/g).map(this.interleavePair).join('') + BarcodeComponent.STOP;
    }

    ngOnInit(): void {

    }

    generateBarcodeSequence( pBankSlipNumber ) {
        this.bankSlipNumber = pBankSlipNumber.replace(/[^\d]/g, '');

        if (!this.valid()) {
            throw new Error('Invalid bank slip number');
        }
    }

    modulo11(pNumber): number {
        let digits = pNumber;

        if (typeof digits === 'string') {
            digits = digits.split('');
        }

        digits.reverse();

        let sum = 0;

        for (let i = 0; i < digits.length; i += 1) {
            sum += ((i % 8) + 2) * digits[i];
        }

        return (11 - (sum % 11)) % 10 || 1;
    }

    /**
     * Validates whether the bank slip number is valid or not
     *
     * The validation function ensures that the bank slip number is exactly 47
     * characters long, then applies the modulo-11 algorithm to the bank slip's
     * barcode. Finally, it verifies that the result of the algorithm equals the
     * checksum digit from the bank slip number.
     *
     * @return {Boolean} Whether the bank slip number is valid or not
     */
    valid() {
        if (this.bankSlipNumber.length !== 47) { return false; }

        const barcodeDigits = this.barcode().split('');
        const checksum = barcodeDigits.splice(4, 1);

        return (this.modulo11(barcodeDigits).toString() === checksum.toString());
    }

    /**
     * Converts the printed bank slip number into the barcode number
     *
     * The bank slip's number is a rearrangement of its barcode, plus three
     * checksum digits. This function executes the inverse process and returns the
     * original arrangement of the code. Specifications can be found at
     * https://portal.febraban.org.br/pagina/3166/33/pt-br/layour-arrecadacao
     *
     * @return {String} The barcode extracted from the bank slip number
     */
    barcode() {
        return this.bankSlipNumber.replace(
            /^(\d{4})(\d{5})\d{1}(\d{10})\d{1}(\d{10})\d{1}(\d{15})$/,
            '$1$5$2$3$4',
        );
    }

    /**
     * Returns the bank slip's raw number
     *
     * @return {String} The raw bank slip number
     */
    number() {
        return this.bankSlipNumber;
    }

    /**
     * Returns the bank slip number with the usual, easy-to-read mask:
     * 00000.00000 00000.000000 00000.000000 0 00000000000000
     *
     * @return {string} The formatted bank slip number
     */
    prettyNumber() {
        return this.bankSlipNumber.replace(
            /^(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d{1})(\d{14})$/,
            '$1.$2 $3.$4 $5.$6 $7 $8',
        );
    }

    /**
     * Returns the name of the bank that issued the bank slip
     *
     * This function is able to identify the most popular or commonly used banks
     * in Brazil, but not all of them are included here.
     *
     * A comprehensive list of all Brazilian banks and their codes can be found at
     * http://www.buscabanco.org.br/AgenciasBancos.asp
     *
     * @return {String} The bank name
     */
    bank() {
        switch (this.barcode().substr(0, 3)) {
            case '001': return 'Banco do Brasil';
            case '007': return 'BNDES';
            case '033': return 'Santander';
            case '069': return 'Crefisa';
            case '077': return 'Banco Inter';
            case '102': return 'XP Investimentos';
            case '104': return 'Caixa Econômica Federal';
            case '140': return 'Easynvest';
            case '197': return 'Stone';
            case '208': return 'BTG Pactual';
            case '212': return 'Banco Original';
            case '237': return 'Bradesco';
            case '260': return 'Nu Pagamentos';
            case '341': return 'Itaú';
            case '389': return 'Banco Mercantil do Brasil';
            case '422': return 'Banco Safra';
            case '505': return 'Credit Suisse';
            case '633': return 'Banco Rendimento';
            case '652': return 'Itaú Unibanco';
            case '735': return 'Banco Neon';
            case '739': return 'Banco Cetelem';
            case '745': return 'Citibank';
            default: return 'Unknown';
        }
    }

    /**
     * Returns the currency of the bank slip
     *
     * The currency is determined by the currency code, the fourth digit of the
     * barcode. A list of values other than 9 (Brazilian Real) could not be found.
     *
     * @return {String} The currency code, symbol and decimal separator
     */
    currency() {
        switch (this.barcode()[3]) {
            case '9': return { code: 'BRL', symbol: 'R$', decimal: ',' };
            default: return 'Unknown';
        }
    }

    /**
     * Returns the verification digit of the barcode
     *
     * The barcode has its own checksum digit, which is the fifth digit of itself.
     *
     * @return {String} The checksum of the barcode
     */
    checksum() {
        return this.barcode()[4];
    }

    /**
     * Returns the date when the bank slip is due
     *
     * The portion of the barcode ranging from its sixth to its nineth digits
     * represent the number of days since the 7th of October, 1997 up to when the
     * bank slip is good to be paid. Attempting to pay a bank slip after this date
     * may incurr in extra fees.
     *
     * @return {Date} The expiration date of the bank slip
     */
    expirationDate() {
        const refDate = new Date('1997-10-07');
        const days = this.barcode().substr(5, 4);

        return new Date(refDate.getTime() + (days * 86400000));
    }

    /**
     * Returns the bank slip's nominal amount
     *
     * @return {String} The bank slip's raw amount
     */
    amount() {
        return (this.barcode().substr(9, 10) / 100.0).toFixed(2);
    }

    /**
     * Returns the bank slip's formatted nominal amount
     *
     * @return {String} The bank slip's formatted amount
     */
    prettyAmount() {
        const currency = this.currency();

        if (currency === 'Unknown') {
            return this.amount();
        }

        return `${currency.symbol} ${this.amount().replace('.', currency.decimal)}`;
    }

    /**
     * Renders the bank slip as a child of the provided selector
     *
     * @param {String} element The element to the object where the SVG must be
     * appended
     *
     * @see {@link SVG#render}
     */
    toSVG(element = null) {
        if(element != null && element != undefined){
            const stripes = this.encode(this.barcode());
            let result = new BarcodeSVG(stripes).render(element);
            return result === undefined ? '' : result;
        }else{
            return '';
        }
    }


}
