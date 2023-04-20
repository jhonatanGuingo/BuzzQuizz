function alt_pag_inicial_quiz(){
    document.getElementById("pag_inicial").style.display = "none";
    document.getElementById("pag_inicial").style.display = "flex";
}
function altCriarQuizz(){
    let=pagInicial = document.getElementById("pag_inicial"); 
    pagInicial.classList.add('esconder');
    let info = document.querySelector('.info-do-quizz');
    info.classList.remove('esconder');
}