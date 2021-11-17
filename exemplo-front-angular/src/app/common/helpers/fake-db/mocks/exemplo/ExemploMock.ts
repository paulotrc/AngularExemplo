import * as faker from 'faker/locale/pt_BR';
export class ExemploMock {
    public static itens = () => {
            const cursos = [];
            if ( undefined === localStorage.getItem('exemploList') || null === localStorage.getItem('exemploList')
            || JSON.parse(localStorage.getItem('exemploList') )?.length === 0) {
                for (let i = 0; i < 20; i++) {
                    cursos.push({
                    id: faker.random.number({min: 5, max: 100}),
                    titulo: 'Exemplo de ' + faker.lorem.words(2),
                    codigoReceita: '000-' + faker.random.number({min: 5, max: 100}),
                    objetivo: faker.lorem.words(6),
                    cargaHoraria: faker.random.number({min: 20, max: 60}),
                    valor: faker.finance.amount(100, 1000, 2, 'R$ '),
                    preRequisito: faker.random.words(4),
                    publicoAlvo: faker.random.words(1),
                    documentosObrigatorios: faker.random.words(4),
                    resultadoEsperado: faker.random.words(3),
                    conteudoProgramatico: faker.random.words(10),
                    modalidade: faker.lorem.words(1),
                    liberarComprarVoucher: faker.random.arrayElement(['sim', 'não']),
                    status: 'Ativo',
                    starred: null,
                    ano: '20' + faker.random.number({min: 10, max: 25})
                    });
            }
        }
            return cursos;
    }

    public static item = (id) => {
        return JSON.parse(localStorage.getItem('exemploList'))[id];
    }
}
