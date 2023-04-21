let right_answers = 0;
let wrong_answers = 0;
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function verificar_resposta(){
    let touched_element = event.target.closest("button");
    let div = event.target.closest("div");
    let question_box = div.closest("#caixa_pergunta");
    let perguntas_quiz = document.getElementById("perguntas_quiz");
    for (let a = 0; a < div.children.length; a++){
        let elem = div.children[a];
        elem.setAttribute("disabled", "disabled");
        if (elem != touched_element){
            elem.setAttribute("style", "opacity: 0.3;");
        }
        if (elem.id == "0"){
            elem.children[1].setAttribute("style", "color: rgb(255, 50, 50);");
        }else{
            elem.children[1].setAttribute("style", "color: rgb(50, 255, 50);");
        }
    }
    if (touched_element.id == "1"){
        right_answers = right_answers + 1;
    }
    else{
        wrong_answers = wrong_answers + 1;
    }
    if (right_answers + wrong_answers == n_questions){
        console.log("fim");
        finalScreen();
    }
    if (question_box != perguntas_quiz.lastChild){
        for (let c = 0; c < perguntas_quiz.children.length; c++){
            if (perguntas_quiz.children[c] == question_box){
                await sleep(2000);
                perguntas_quiz.children[c+1].scrollIntoView({ behavior:"smooth", block:"start", inline:"start"});
            }
        }
    }
}

function finalScreen(){
    let telaFinal = document.querySelector(".final_quiz");
    telaFinal.classList.remove("esconder");
}

function voltarTelaPrincipal(){
    document.getElementById("pag_inicial").style.display = "flex";
    document.getElementById("pag_quiz").style.display = "none";
    window.location.reload();
}

function reiniciarQuiz(){

}