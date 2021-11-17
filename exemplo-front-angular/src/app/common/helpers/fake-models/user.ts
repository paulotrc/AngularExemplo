export class User {
    id: any;
    name: string;
    userName: string;
    password: string;
    email: string;
    avatar: string;
    role: string;
    status: string;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.userName = model.userName;
        this.password = model.password;
        this.email = model.email;
        this.avatar = model.avatar;
        this.role = model.role;
        this.status = model.status;
    }
}
