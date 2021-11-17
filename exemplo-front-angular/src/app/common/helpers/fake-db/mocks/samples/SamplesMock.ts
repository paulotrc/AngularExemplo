
import * as faker from 'faker/locale/pt_BR';
export class SamplesMock {


    public static report = {
        from    : {
            title  : 'Test Inc.',
            address: '2810 Country Club Road Cranford, NJ 07016',
            phone  : '+66 123 455 87',
            email  : 'hello@Testinc.com',
            website: 'www.Testinc.com'
        },
        client  : {
            title  : 'John Doe',
            address: '9301 Wood Street Philadelphia, PA 19111',
            phone  : '+55 552 455 87',
            email  : 'johndoe@mail.com'
        },
        number  : 'P9-0004',
        date    : 'Jul 19, 2015',
        dueDate : 'Aug 24, 2015',
        services: [
            {
                title    : 'Prototype & Design',
                detail   : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan, quam sed eleifend imperdiet.',
                unit     : 'Hour',
                unitPrice: '12.00',
                quantity : '240',
                total    : '2880'
            },
            {
                title    : 'Coding',
                detail   : 'Vestibulum ligula sem, rutrum et libero id, porta vehicula metus. Cras dapibus neque sit amet laoreet vestibulum.',
                unit     : 'Hour',
                unitPrice: '10.50',
                quantity : '350',
                total    : '3675'
            },
            {
                title    : 'Testing',
                detail   : 'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
                unit     : 'Hour',
                unitPrice: '4.00',
                quantity : '50',
                total    : '200'
            },
            {
                title    : 'Documentation & Training',
                detail   : 'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
                unit     : 'Hour',
                unitPrice: '6.50',
                quantity : '260',
                total    : '1690'
            }
        ],
        subtotal: '8445',
        tax     : '675.60',
        discount: '120.60',
        total   : '9000'
    };


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
                        creationDate: faker.date.recent().getDate().toString(),
                        updateDate: faker.date.recent(),
                        alias: faker.hacker.abbreviation(),
                        status: 'Ativo',
                        starred: faker.random.arrayElement([true, false]),
                        price: faker.finance.amount(100, 20000, 2 , ''),
                        report: SamplesMock.report
                    });
            }

                itens[0].id = 88;

        }
            return itens;
    }

    public static item = (id) => {
        return JSON.parse(localStorage.getItem('samplesList'))[id];
    }
}
