let token_api = "Ig05OI8F18Lp90ZDISfjWMt8";

atualizar_quizzes();

function atualizar_quizzes(){
    axios.defaults.headers.common['Authorization'] = token_api;
    let send = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
    console.log("Estou atualizando os quizzes");
    send.then(sucess);
    send.catch(error);
    function sucess(response){
        console.log("Encontrei os Quizzes gerais");
        for (let i = 0; i < response.data.length; i++){
            if (i < 6){
                let id_quiz = response.data[i].id;
                let titulo_quiz = response.data[i].title;
                let image_quiz = response.data[i].image;
                let create_div_quiz = document.createElement('div');
                let create_span_div_quiz = document.createElement('span');
                let style_line = 'background-image: linear-gradient(360deg, rgb(0, 0, 0, 0.8) 2%, rgb(255, 255, 255, 0) 100%), url(' + image_quiz + ')';
                create_div_quiz.classList.add("todos-quizzes-quizdiv");
                create_div_quiz.setAttribute("style", style_line);
                create_span_div_quiz.classList.add("todos-quizzes-conteudo-tituloquiz");
                create_span_div_quiz.innerHTML = titulo_quiz;
                create_div_quiz.appendChild(create_span_div_quiz);
                document.getElementById("todos_quizzes_conteudo").appendChild(create_div_quiz);
            }
        }
    }
    function error(response){
        console.log(response.status);
    }
    document.getElementById("seus_quizzes_criar").style.display = "none";
    document.getElementById("seus_quizzes_mostrar").style.display = "flex";
}