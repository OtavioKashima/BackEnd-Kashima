const User = require("./user");
const path = require("path");//Modulo para manipular caminhos
const fs = require("fs"); //Modulo para manipular arquivos (file system)
const bcrypt = require("bcryptjs"); //Modulo para criptografar senha

class userService{
    constructor(){
        this.filePath = path.join(__dirname, 'user.json');
        this.users = this.loadUser(); //Array para armazenar user
        this.nextId = this.getNextID(); //Contador para gerar o id
    }

    loadUser(){
        try{
        if(fs.existsSync(this.filePath)){
            const data = fs.readFileSync(this.filePath);
            return JSON.parse(data)
        }
    }catch(erro){
        console.log("Erro ao carregar arquivo", erro);
    }
    return[]; 
}

//definir próximo id a ser utilizado
    getNextID(){// função para buscar o próximo id
        try{
        if(this.users.length===0) return 1;
        return Math.max(...this.users.map(user=>user.id)) +1;
        }catch(erro){
            console.log("Erro ao buscar o próximo id", erro);
        }
}

    saveUsers(){
        try{
            fs.writeFileSync(this.filePath, JSON.stringify(this.users));
        }catch(erro){
            console.log("Erro ao salvar um usuário", erro);
        }
    }

    async addUser(nome, email, senha, endereco, telefone, cpf){ //async: função assíncrona 
        try{
            const senhaCrip = await bcrypt.hash(senha, 10); //await: só segue pro próximo passo quando a função terminar, numero 1-10 é o nível de criptografia
        const user = new User(this.nextId++, nome, email, senhaCrip, endereco, telefone, cpf);
        this.users.push(user)
        this.saveUsers();
        return user;
        }catch(erro){
            console.log("Erro ao adicionar um usuário", erro);
        }
    }

    deleteUser(id){
        try{
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
        }catch(erro){
            console.log("Erro ao deletar um usuário", erro);
        }
    }

    async alterUser(id, nome, email, senha, endereco, telefone, cpf){
        try{
            const senhaCrip = await bcrypt.hash(senha, 10); //await: só segue pro próximo passo quando a função terminar, numero 1-10 é o nível de criptografia
            const user = this.users.find(user => user.id === id);
            if(!user) throw new Error("Usuário não encontrado");
            user.nome = nome;
            user.email = email;
            user.senha = senhaCrip;
            user.endereco = endereco;
            user.telefone = telefone;
            user.cpf = cpf;
            this.saveUsers();
            return user;
        }catch(erro){
            console.log("Erro ao alterar um usuário", erro);
        }
    }

    getUser(){
        try{
            return this.users
        }catch(erro){
            console.log("Erro ao buscar um usuário", erro);
        }
    }

}


module.exports = new userService;