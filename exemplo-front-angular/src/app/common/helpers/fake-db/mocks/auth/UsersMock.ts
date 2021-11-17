import * as faker from 'faker/locale/pt_BR';
import {CoreUtils} from '../../../../../../core/utils/CoreUtils';
import {User} from '../../../../models';
export class UsersMock {
    public static itens = () => {
        let itens = [];
        if ( undefined === localStorage.getItem('usersList') || null === localStorage.getItem('usersList')
            || JSON.parse(localStorage.getItem('usersList') )?.length === 0) {
                for (let i = 0; i < 20; i++) {
                    itens.push({
                        id: faker.random.number({min: 5, max: 100}),
                        username: faker.name.findName(),
                        email: faker.internet.email(),
                        password: faker.internet.password(),
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        avatar: '~/assets/images/avatars/profile.jpg',
                        token: 'fake-jwt-token'
                    });
            }
                itens.push( CoreUtils.generateFakeUser( new User({} ) ) );
                localStorage.setItem('usersList', JSON.stringify(itens));
        } else {
                itens = JSON.parse(localStorage.getItem('usersList') );
        }

        return itens;
    }

    public static item = (id) => {
        return JSON.parse(localStorage.getItem('usersList'))[id];
    }
}
