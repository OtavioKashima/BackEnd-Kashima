const express = require("express");
const userService = require("./userService");

const app = express(); // nome qualquer para express
app.use(express.json()); // Vou habilitar json no express

// Rota para entrar usuário

app.post("/users", async (req, res) => { //async: função assíncrona depois da rota
    const { nome, email, senha, endereco, telefone, cpf } = req.body;
    if (!nome || !email || !senha ||!endereco || !telefone || !cpf) {
        return res.status(400).json
            ({ error: "Nome, email, senha, endereço, telefone e CPF são obrigatórios" })
    }
    const user = await userService.addUser(nome, email, senha, endereco, telefone, cpf);
    res.status(200).json({ user });
})

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    try{
        const resultado = userService.deleteUser(id);
        res.status(200).json(resultado);
    }catch(erro){
        res.status(400).json({error: erro.message});
    }
})

app.get("/users", (req, res) => {
    res.json(userService.getUser());
})

app.put("/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha, endereco, telefone, cpf } = req.body;
    try{
        const resultado = await userService.alterUser(id, nome, email, senha, endereco, telefone, cpf);
        res.status(200).json(resultado);
    }catch(erro){
        res.status(400).json({error: erro.message});
    }
})

const port = 3000
app.listen(port, () => {
    console.log("Servidor rodando na porta", port);
})