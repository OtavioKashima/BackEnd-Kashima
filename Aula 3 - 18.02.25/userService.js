const User = require("./user");
const path = require("path");//Modulo para manipular caminhos
const fs = require("fs"); //Modulo para manipular arquivos (file system)

class userService{
    constructor(){
        this.filePath = path.join(__dirname, 'user.json');
        this.users = []; //Array para armazenar user
        this.nextId = 1; //Contador para gerar o id
    }

    loadUser(){
        try{
        if(fs.existsSync(this.filePath)){
            const data = fs.readFileSync(this.filePath)
            return JSON.parse(data)
        }
    }catch(erro){
        console.log("Erro ao carregar arquivo", erro);
    }
    return[]; 
}


    getNextID(){
        try{
        if(this.user.length===0) return 1;
        return Math.max(...this.users.map(user=>user.id) +1;
        }catch(erro){
            console.log("Erro ao buscar o próximo id");
        }
}


    addUser(nome, email){
        const user = new User(this.nextId++, nome, email);
        this.users.push(user)
        return user;
    }
    getUser(){
        return this.users
    }
}

module.exports = new userService;