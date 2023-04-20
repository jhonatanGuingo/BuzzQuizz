function alt_pag_inicial_quiz(){
    document.getElementById("pag_inicial").style.display = "none";
    document.getElementById("pag_inicial").style.display = "flex";
}
//muda para a tela de criação de quizz
function altCriarQuizz(){
    let=pagInicial = document.getElementById("pag_inicial"); 
    pagInicial.classList.add('esconder');
    let info = document.querySelector('.info-do-quizz');
    info.classList.remove('esconder');
}
function alt_paginic_quiz(){
    let id = event.target.id;
    let send = axios.get("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/" + id);
    send.then(sucess);
    send.catch(error);
    function sucess(response){
        let id_quiz = response.data.id;
        let titulo_quiz = response.data.title;
        let image_quiz = response.data.image
        console.log(response.data);
    }
    function error(response){
        console.log(response.status);
    }
}