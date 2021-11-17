export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string;
    token: string;
    chave: string;

    /**
     * Constructor
     *
     * @param user
     */
    constructor(user)
    {
        {
            this.id = user.id || null;
            this.username = user.username || '';
            this.email = user.email || '';
            this.password = user.password || '';
            this.firstName = user.firstName || '';
            this.lastName = user.lastName || '';
            this.avatar = user.avatar || 'assets/images/avatars/profile.jpg';
            this.token = user.nickname || '';
            this.chave = '';
        }
    }
}
