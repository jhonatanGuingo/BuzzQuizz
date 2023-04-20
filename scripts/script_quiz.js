let right_answers = 0;
let wrong_answers = 0;

function verificar_resposta(){
    // scrollIntoView
    let touched_element = event.target.closest("button");
    let div = event.target.closest("div");
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
    }
}