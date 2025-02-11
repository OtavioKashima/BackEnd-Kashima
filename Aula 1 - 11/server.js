const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world! Servidor rodando com express.");
});




app.listen(port, () => {
    console.log("Servidor rodadando na porta", port);
});