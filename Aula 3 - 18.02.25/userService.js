const User = require("./user");
const path = require("path");//Modulo para manipular caminhos
const fs = require("fs"); //Modulo para manipular arquivos (file system)
const bcrypt = require("bcryptjs"); //Modulo para criptografar senha
const { verify } = require("crypto");

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
        res.status(400).json({error: erro.message});
    }
    return[]; 
}

//definir próximo id a ser utilizado
    getNextID(){// função para buscar o próximo id
        try{
        if(this.users.length===0) return 1;
        return Math.max(...this.users.map(user=>user.id)) +1;
        }catch(erro){
            cres.status(400).json({error: erro.message});
        }
}

    saveUsers(){
        try{
            fs.writeFileSync(this.filePath, JSON.stringify(this.users));
        }catch(erro){
            res.status(400).json({error: erro.message});
        }
    }

    async addUser(nome, email, senha, endereco, telefone, cpf){ //async: função assíncrona 
        try{
            const cpfex = this.users.find(user => user.cpf === cpf);
            if(cpfex){
                console.log("CPF já cadastrado")
                return {erro: "CPF já cadastrado"}
            }else{
            const emailex = this.users.find(user => user.email === email);
            if(emailex){
                    console.log("Email já cadastrado")
                    return {erro: erro.message}
                }
            else{
                const senhaCrip = await bcrypt.hash(senha, 10); //await: só segue pro próximo passo quando a função terminar, numero 1-10 é o nível de criptografia
                const user = new User(this.nextId++, nome, email, senhaCrip, endereco, telefone, cpf);
                this.users.push(user)
                this.saveUsers();
                return user;
            }
        }
    }
        catch(erro){
            res.status(400).json({error: erro.message});
            }
}

    deleteUser(id){
        try{
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
            return ("Usuario deletado com sucesso!")
        }catch(erro){
            res.status(400).json({error: erro.message});
        }
    }

    async alterUser(id, nome, email, senha, endereco, telefone, cpf){
        try{
            const cpfex = this.users.find(user => user.cpf === cpf);
            if (cpfex){
                if(cpfex){
                    console.log("CPF já cadastrado")
                    return {erro: "CPF já cadastrado"}
                }
            }else{
                const emailex = this.users.find(user => user.email === email);
            if(emailex){
                    console.log("Email já cadastrado")
                    return {erro: "Email já cadastrado"}
                }
            const senhaCrip = await bcrypt.hash(senha, 10); //await: só segue pro próximo passo quando a função terminar, numero 1-10 é o nível de criptografia
            const user = this.users.find(user => user.id === id);
            if(!user) throw new erro("Usuário não encontrado");
            user.nome = nome;
            user.email = email;
            user.senha = senhaCrip;
            user.endereco = endereco;
            user.telefone = telefone;
            user.cpf = cpf;

           
                this.saveUsers();
                return user;
            }
        }catch(erro){
            res.status(400).json({error: erro.message});
        }
    }

    getUser(){
        try{
            return this.users
        }catch(erro){
            res.status(400).json({error: erro.message});
        }
    }

}


module.exports = new userService;