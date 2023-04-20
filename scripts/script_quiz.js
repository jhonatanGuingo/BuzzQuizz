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
        let fim_create_div = document.createElement("div");
        let fimtitulo_create_div = document.createElement("div");
        let fimtitulo_create_p = document.createElement("p");
        let fimlast_create_div = document.createElement("div");
        let fimlast_create_img = document.createElement("img");
        let fimlast_create_span = document.createElement("span");
        let style_background_line = "background: rgb(255, 50, 50);";
        let rights = Math.round((right_answers/n_questions)*100);
        console.log(levels_quiz);
        for (let i = 0; i < levels_quiz.length; i++){
            let min_value = levels_quiz[i].minValue;
            if (rights < min_value){
                let title_level = levels_quiz[i-1].title;
                let image_level = levels_quiz[i-1].image;
                let text_level = levels_quiz[i-1].text;
                break;
            }
        }
        fimtitulo_create_p.innerHTML = title_level;
        fimtitulo_create_div.classList.add("pergunta-quizz");
        fimtitulo_create_div.setAttribute("style", style_background_line);
        fimtitulo_create_div.append(fimtitulo_create_p);
        fim_create_div.appendChild(fimtitulo_create_div);
        fim_create_div.classList.add("conteudo-quizz");
        fimlast_create_img.setAttribute("src", image_level);
        fimlast_create_span.innerHTMl = text_level;
        fimlast_create_div.appendChild(fimlast_create_img);
        fimlast_create_div.appendChild(fimlast_create_span);
        fim_create_div.append(fimlast_create_div);
        document.getElementById("perguntas_quiz").appendChild(fim_create_div);
        console.log(levels_quiz);
        console.log(rights);
    }
    for (let c = 0; c < perguntas_quiz.children.length; c++){
        if (perguntas_quiz.children[c] == question_box){
            await sleep(2000);
            perguntas_quiz.children[c+1].scrollIntoView({ behavior:"smooth", block:"start", inline:"center"});
        }
    }
}