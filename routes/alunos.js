const express = require("express");

const alunos = express.Router();

const fs = require("fs");

alunos.route('/')
.get((req,res)=>{
    const {nome,media} = req.query;
    const db = lerDataBase();
    if(nome || media){
       if(nome){
        const dbModificado = db.filter(aluno=> aluno.nome.toLowerCase().includes(nome.toLowerCase())) ;
        res.status(200).json(dbModificado);
       } else if (media) {
            const dbModificado = db.filter(aluno => Number(aluno.media) >= Number(media))
            res.status(200).json(dbModificado);}
    } else {
        res.status(200).json(db);
    }
})

.post((req,res)=>{
    const {matricula,nome, media} = req.body
    if(!matricula || !nome || !media){
        res.status(400).json({message: "Exitem campos vazios ou incorretos"})
    } else {
        const db = lerDataBase();
        const alunoEncontrado = db.find(aluno => aluno.matricula === matricula)
        if(alunoEncontrado != undefined){
            res.status(400).json({mensagem:"Aluno ja existe"})
        } else {
            const novoAluno = {matricula,nome,media};
            res.status(200).json({message: "Aluno adicionado com sucesso"});
            db.push(novoAluno);
            gravarDataBase(db);
        }
    }  
})

.put((req,res)=>{
    const {matricula,nome,media} = req.body;
    if( !matricula || !nome || !media){
        res.status(400).json({message:"Exitem campos vazios ou incorretos"})
    } else {
        const db = lerDataBase();
        const alunoEncontrado = db.find(aluno => aluno.matricula === matricula)
        if(!alunoEncontrado){
            res.status(404).json({mensagem:"Aluno não encontrado"})
        } else {
            const dbModificado = db.filter(aluno => aluno.matricula !== matricula)
            const alunoAtt = {matricula,nome,media};
            dbModificado.push(alunoAtt);    
            gravarDataBase(dbModificado);
            res.status(200).json({message: "Aluno atualizado com sucesso"});
        }
    }
})

.delete((req,res)=>{
    const {matricula,nome,media} = req.body;
    if(!matricula || !nome || !media) {
        res.status(400).json({message: "Exitem campos vazios ou incorretos"});
    } else {
        const db = lerDataBase();
        const alunoEncontrado = db.find(aluno => aluno.matricula === matricula); 
        if(!alunoEncontrado) {
            res.status(404).json({message: "Aluno não encontrado"});
        } else {
            const dbModificado = db.filter(aluno => aluno.matricula !== matricula);
            gravarDataBase(dbModificado);
            res.status(200).json({message: "Aluno excluido com sucesso"})};
        };
});


function lerDataBase (){
    const arquivo = fs.readFileSync('./db/db.json'); 
    const db = JSON.parse(arquivo); 
    return db
}

function gravarDataBase (db) {
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 2));
}

module.exports = alunos;

