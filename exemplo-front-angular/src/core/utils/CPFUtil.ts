export class CPFUtil {

    static gerarCpf = (onlyDigits = false) => {
        // aleatorio já devolve string, logo não precisa de toString
        const num1 = CPFUtil.aleatorio();
        const num2 = CPFUtil.aleatorio();
        const num3 = CPFUtil.aleatorio();

        const dig1 = CPFUtil.dig( num1, num2, num3 ); // agora só uma função dig
        const dig2 = CPFUtil.dig( num1, num2, num3, dig1 ); // mesma função dig aqui

        // aqui com interpolação de strings fica bem mais legivel
        return (onlyDigits === true ) ? `${num1}${num2}${num3}${dig1}${dig2}` : `${num1}.${num2}.${num3}-${dig1}${dig2}`;
    }

    // o quarto parametro(n4) só será recebido para o segundo digito
    static dig = (n1, n2, n3, n4 = null) => {

        // as concatenações todas juntas uma vez que são curtas e legíveis
        const nums = n1.split('').concat(n2.split(''), n3.split(''));

        if (n4) { // se for o segundo digito coloca o n4 no sitio certo
            nums[9] = n4;
        }

        let x = 0;

        // o j é também iniciado e incrementado no for para aproveitar a própria sintaxe dele
        // o i tem inicios diferentes consoante é 1º ou 2º digito verificador
        for (let i = (n4 ? 11 : 10), j = 0; i >= 2; i--, j++) {
            x += parseInt(nums[j]) * i;
        }

        const y = x % 11;
        // ternário aqui pois ambos os retornos são simples e continua legivel
        return y < 2 ? 0 : 11 - y;
    }

    static aleatorio = () => {
        const aleat = Math.floor(Math.random() * 999);
        // o preenchimento dos zeros à esquerda é mais facil com a função padStart da string
        return ('' + aleat).padStart(3, '0');
    }

}
