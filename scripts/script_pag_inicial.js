// alterar o layout de Seus quizzes conforme existência de quizzes pessoais. Lembrar de ocultar o layout de seus-quizzes-criar-border e permitir o seus-quizzes-mostrar//
function atualizar_seus_quizzes(){
    document.getElementById("seus_quizzes_criar").style.display = "none";
    document.getElementById("seus_quizzes_mostrar").style.display = "flex";
    document.getElementById("btn_teste").onclick = reatualizar_seus_quizzes;
}
function reatualizar_seus_quizzes(){
    document.getElementById("seus_quizzes_criar").style.display = "flex";
    document.getElementById("seus_quizzes_mostrar").style.display = "none";
    document.getElementById("btn_teste").onclick = atualizar_seus_quizzes;
}