class User {
    constructor (id, nome, email, senha, endereco, telefone, cpf){
        this.id = id; //id do usuário
        this.nome = nome; // nome do usuário
        this.email = email;
        this.senha = senha;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cpf = cpf; // email do usuário
    }
}

module.exports = User; //exporta o módulo
    