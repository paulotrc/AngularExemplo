
import * as faker from 'faker/locale/pt_BR';
export class TivitsMock {
    public static itens = () => {
            const itens = [];
            if ( undefined === localStorage.getItem('samplesList') || null === localStorage.getItem('samplesList')
            || JSON.parse(localStorage.getItem('samplesList') )?.length === 0) {
                for (let i = 0; i < 20; i++) {
                    itens.push({
                        id: faker.random.number({min: 5, max: 100}),
                        name: 'Sample mock ' + faker.hacker.abbreviation(),
                        description: faker.lorem.words(6),
                        repository: faker.internet.url(),
                        createBy: faker.random.uuid(),
                        updateBy: faker.random.uuid(),
                        creationDate: faker.date.recent(),
                        updateDate: faker.date.recent(),
                        alias: faker.random.words(10),
                        status: 'Ativo',
                        starred: faker.random.arrayElement([true, false])
                    });
            }
        }
            return itens;
    }

    public static item = (id) => {
        return JSON.parse(localStorage.getItem('samplesList'))[id];
    }
}
