const express = require("express");

const app = express();

const alunos = require("./alunos");


app.get("/alunos",(req,res)=>{
    let listaAlunos = alunos.alunos;
    if(req.query.nome){
        listaAlunos = alunos.filtroNome(req.query.nome);
    } else if (req.query.media) {
        listaAlunos = alunos.filtroMedia(req.query.media);
    } 
    res.json(listaAlunos);
});


app.listen(3000,()=>{
    console.log("Servidor rodando em http://localhost:3000/")
});