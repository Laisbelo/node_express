const express = require("express");

const app = express();

app.use(express.json());

const alunos = require("./alunos");

//ROTA GET ALUNOS
app.get("/alunos",(req,res)=>{
    let listaAlunos = alunos.alunos;
    if(req.query.nome){
        listaAlunos = alunos.filtroNome(req.query.nome);
    } else if (req.query.media) {
        listaAlunos = alunos.filtroMedia(req.query.media);
    } 
    res.json(listaAlunos);
});

//ROTA POST ALUNOS/NOVO
app.post("/alunos/novo",(req,res)=>{
    let {nome,matricula,media} = req.body;
    if(nome != undefined && matricula != undefined && media != undefined) {
        res.json(`Nome: ${nome}, Matricula: ${matricula} e Media: ${media}`)
    } else { 
        res.status(400).json({message:"Exitem campos vazios ou incorretos"})
    }
});

//ROTA POST ALUNOS/DELETAR
app.post("/alunos/deletar/:index",(req,res)=>{
    const index = Number(req.params.index);
    if(isNaN(index)){
        res.status(400).json({message:"Index inválido"})
    } else if(index < 0 | index >= alunos.alunos.length){
        res.status(404).json({message: "Aluno não encontrado"});
    } else {
        alunos.deletarAluno(index);
        res.status(204).json({message:"Aluno deletado com sucesso"})
    }
})

//ROTA POST ALUNOS/ATUALIZAR
app.post("/alunos/atualizar/:index",(req,res)=>{
    const index = Number(req.params.index);
    let {nome,media} = req.body;
    if(isNaN(index)){
        res.status(400).json({message:"Index inválido"})
    } else if(index < 0 | index >= alunos.alunos.length){
        res.status(404).json({message: "Aluno não encontrado"});
    }  else if (nome === undefined | media === undefined) {
        res.status(400).json({message:"Dados inválidos. Digite um nome e média válidos"})
    } else {
        alunos.alunos[index].nome = nome;
        alunos.alunos[index].media = media;
        res.status(200).json({message:"Aluno atualizado com sucesso"})
    }
})



app.listen(3000,()=>{
    console.log("Servidor rodando em http://localhost:3000/")
});