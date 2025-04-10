//classe base Usuário
class Usuario{
    constructor(nome, email, senha){
        this.nome = nome;
        this.email = email;
        this._senha = senha; //atributo privado
    }

    autenticar(senha){
        return senha == this._senha;
    }

    alterarSenha(novaSenha){
        this._senha = novaSenha;
        console.log("Senha alterada com sucesso");
    }

}
//Classe admin que herda de usuário

class Admin extends Usuario{
    constructor(nome, email, senha, nivelAcesso){
        super(nome, email, senha); //chama o constructor da classe pai
        this.nivelAcesso = nivelAcesso;
    }

    banirUsuario(Usuario){
        console.log(`${Usuario.nome} Foi banido do sistema ${this.nome}`)
    }

    //Polimorfismo sobrepondo o metodo autenticar
    autenticar(senha){
        return senha === this._senha && this.nivelAcesso === 'alto';
    }
}

//Exemplo de uso

const usuario1 = new Usuario("Luis", "luizretiupe@gmail.com", "2009");
const usuario2 = new Admin("Maria", "maria@gmail.com", "2008");
console.log(usuario1.autenticar("2009"));//senha certa
console.log(usuario2.autenticar("2008"));
usuario2.banirUsuario(usuario1);