const User = require("./user");

class userService{
    constructor(){
        this.users = []; //Array para armazenar user
        this.nextId = 1; //Contador para gerar o id
    }

    addUser(nome, email){
        const User = new User(this.nextId++, nome, email);
        this.users.push(user)
        return users;
    }
    getUsers(){
        return this.users
    }
}

module.export = new userService;