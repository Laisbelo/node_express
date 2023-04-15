const express = require("express");

const alunos = require('./routes/alunos')

const app = express();

app.use(express.json());

app.use('/alunos',alunos);

app.listen(3000,()=>{
    console.log("Servidor rodando em http://localhost:3000/")
});