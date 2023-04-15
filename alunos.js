
const alunos = [
    {
        id: 0,
        nome: "Joana",
        media: 7,
    },
    {
        id: 1,
        nome: "Pedro",
        media: 10,
    },
    {
        id: 2,
        nome: "Lauro",
        media: 5,
    },
    {
        id: 3,
        nome: "Lia",
        media: 2,
    },
    {
        id: 4,
        nome: "Simone",
        media: 6,
    },
    {
        id: 5,
        nome: "Maria",
        media: 0,
    },
]


function filtroNome(nome){
    return alunos.filter((aluno) => 
        aluno.nome.toLowerCase().includes(nome.toLowerCase())
    )};

function filtroMedia(minMedia){
    return alunos.filter((aluno) => 
        aluno.media >= minMedia
    )};

function deletarAluno(index){
    alunos.splice(index,1)
}

module.exports = {alunos,filtroNome,filtroMedia,deletarAluno};