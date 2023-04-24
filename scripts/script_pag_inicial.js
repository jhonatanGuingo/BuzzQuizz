let token_api = "Ig05OI8F18Lp90ZDISfjWMt8";
localStorage.setItem("ids_quizzes_criados", "[]");
let user_quizzes = JSON.parse(localStorage.getItem("ids_quizzes_criados"));

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
            let id_quiz = response.data[i].id;
            let titulo_quiz = response.data[i].title;
            let image_quiz = response.data[i].image;
            let create_btn_quiz = document.createElement('button');
            let create_div_quiz = document.createElement('div');
            let create_span_div_quiz = document.createElement('span');
            let create_img = document.createElement('img');
            let style_line = 'background-image: linear-gradient(360deg, rgb(0, 0, 0, 0.8) 2%, rgb(255, 255, 255, 0) 100%), url(' + image_quiz + ')';
            let a = 0;
            create_img.src = image_quiz;
            create_img.setAttribute('style', 'width: 0px;');
            for (let j = 0; j < user_quizzes.length; j++){
                if (user_quizzes[j] == id_quiz){
                    a = 1;
                }
            }
            if (a == 0){
                create_btn_quiz.classList.add('button-quiz');
                create_btn_quiz.onclick = alt_paginic_quiz;
                create_div_quiz.classList.add("todos-quizzes-quizdiv");
                create_div_quiz.id = id_quiz;
                create_div_quiz.setAttribute("style", style_line);
                create_div_quiz.appendChild(create_img);
                create_span_div_quiz.classList.add("todos-quizzes-conteudo-tituloquiz");
                create_span_div_quiz.innerHTML = titulo_quiz;
                create_div_quiz.appendChild(create_span_div_quiz);
                create_div_quiz.setAttribute('data-test','others-quiz');
                create_btn_quiz.appendChild(create_div_quiz);
                document.getElementById("todos_quizzes_conteudo").appendChild(create_btn_quiz);
            }
            else{
                create_btn_quiz.classList.add('button-quiz');
                create_btn_quiz.onclick = alt_paginic_quiz;
                create_div_quiz.classList.add("seus-quizzes-mostrar-quizdiv");
                create_div_quiz.id = id_quiz;
                create_div_quiz.setAttribute("style", style_line);
                create_span_div_quiz.classList.add("seus-quizzes-mostrar-conteudo-tituloquiz");
                create_span_div_quiz.innerHTML = titulo_quiz;
                create_div_quiz.appendChild(create_span_div_quiz);
                create_div_quiz.setAttribute('data-test','my-quiz');
                create_btn_quiz.appendChild(create_div_quiz);
                document.getElementById("seus_quizzes_mostrar_conteudo").appendChild(create_btn_quiz);
            }
        }
        if (user_quizzes.length != 0){
            document.getElementById("seus_quizzes_mostrar").style.display = "flex";
            document.getElementById("seus_quizzes_criar").style.display = "none";
        }
    }
    function error(response){
        console.log(response.status);
    }
}