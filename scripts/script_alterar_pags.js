let n_questions = 0;
let levels_quiz = "";
let idAnterior = '';
//muda para a tela de criação de quizz
function altCriarQuizz(){
    let=pagInicial = document.getElementById("pag_inicial"); 
    pagInicial.classList.add('esconder');
    let info = document.getElementById('info_do_quizz');
    info.innerHTML+=`
    <h1>Comece pelo começo</h1>
    <div class="infos">
        <input type="text" placeholder="Título do seu quizz">
        <input type="text" placeholder="URL da imagem do seu quizz">
        <input type="text" placeholder="Quantidade de perguntas do quizz">
        <input type="text" placeholder="Quantidade de níveis do quizz">
    </div>
    <button onclick ="altCriarPerguntas()" class="prosseguir">Prosseguir pra criar perguntas</button>
    `
    info.classList.add('centralizar');
}
//muda para tela de criação de perguntas
function altCriarPerguntas(){
    let=criarQuizz = document.getElementById('info_do_quizz') ;
    criarQuizz.classList.remove('centralizar');
    criarQuizz.classList.add('esconder');
    let perguntas = document.getElementById('perguntas_do_quizz');
    perguntas.innerHTML+=`
    <h1>Crie suas perguntas</h1>
    <div class="pergunta">
        <p>Pergunta 1</p>
        <input type="text" placeholder="Texto da pergunta">
        <input type="text" placeholder="Cor de fundo da pergunta">
        <p>Resposta Correta</p>
        <input type="text" placeholder="Resposta correta">
        <input type="text" placeholder="URL da imagem">
        <p>Respostas Incorreta</p>
        <input type="text" placeholder="Resposta incorreta 1">
        <input type="text" placeholder="URL da imagem 1">
        <input type="text" placeholder="Resposta incorreta 2">
        <input type="text" placeholder="URL da imagem 2">
        <input type="text" placeholder="Resposta incorreta 3">
        <input type="text" placeholder="URL da imagem 3">
    </div>
    <button onclick ="altCriarNiveis()" class="prosseguir">Prosseguir pra criar níveis</button>
    `
    perguntas.classList.add('centralizar');
}
//muda para tela de criação de níveis
function altCriarNiveis(){
    let=perguntas = document.getElementById('perguntas_do_quizz') ;
    perguntas.classList.remove('centralizar');
    perguntas.classList.add('esconder');
    let niveis = document.getElementById('niveis_do_quizz');
    niveis.innerHTML+=`
    <div class="nivel">
    <p>Nível 1</p>
    <input type="text" placeholder="Título do nível">
    <input type="text" placeholder="% de acerto mínima">
    <input type="text" placeholder="URL da imagem do nível">
    <input type="text" placeholder="Descrição do nível">
    </div>
    <button onclick ="altFinalizarQuizz()" class="prosseguir">Finalizar Quizz</button>
    `
    niveis.classList.add('centralizar');
}
//muda para tela de finalização da criação de um quizz
function altFinalizarQuizz(){
    let=niveis = document.getElementById('niveis_do_quizz') ;
    niveis.classList.remove('centralizar');
    niveis.classList.add('esconder');
    let finalizar = document.getElementById('finalizar_quizz');
    finalizar.innerHTML+=`
    <p>Seu quizz está pronto!</p>
    <img src="https://uploads.jovemnerd.com.br/wp-content/uploads/2023/03/naruto_episodios_ineditos__3kf0w13t5-1210x544.jpg">
    <h3>nome</h3>
    <button onclick ="acessarQuizz()" class="prosseguir-finalizar">Acessar Quizz</button>
    <div onclick ="voltarPagInicial()" >Voltar pra home</div>
    `
    finalizar.classList.add('centralizar');
}
//retorna para tela inicial
function voltarPagInicial(){
    let=pagInicial = document.getElementById("pag_inicial");
    pagInicial.classList.remove('esconder');
    let finalizar = document.getElementById('finalizar_quizz');
    finalizar.classList.remove('centralizar');
}
//acessa o quiz que acabou de ser criado 
function acessarQuizz(){
    alert("a fazer");
}

function alt_paginic_quiz(){
    let id = event.target.id;
    let send = axios.get("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/" + id);
    send.then(sucess);
    send.catch(error);
    function sucess(response){
        let id_quiz = response.data.id;
        let titulo_quiz = response.data.title;
        let image_quiz = response.data.image;
        let questions_quiz = response.data.questions;
        levels_quiz = response.data.levels;
        let title_geral_create_span = document.createElement("span");
        let img_geral_create_img = document.createElement("img");
        // Formatação da imagem no topo
        img_geral_create_img.classList.add("img-quizz-topo");
        img_geral_create_img.setAttribute("src", image_quiz);
        img_geral_create_img.setAttribute("alt", "");
        document.getElementById("header_quiz").appendChild(img_geral_create_img);
        // Formatação do título no topo
        title_geral_create_span.innerHTML = titulo_quiz;
        document.getElementById("header_quiz").appendChild(title_geral_create_span);
        for (let a = 0; a < questions_quiz.length; a++){
            n_questions = n_questions + 1;
            let titulo_question = questions_quiz[a].title;
            let color_question = questions_quiz[a].color;
            let answers_question = questions_quiz[a].answers;
            let conteudo_quiz_create_div = document.createElement("div");
            let pergunta_quiz_create_div = document.createElement("div");
            let pergunta_quiz_create_p = document.createElement("p");
            let style_background_line = "background: " + color_question + ";";
            // Cria a div das opções
            let img_opcoes_create_div = document.createElement("div");
            img_opcoes_create_div.classList.add("img-opcoes-quizz");
            // Cria a div geral para o conteúdo da pergunta, depois insere o título da pergunta numa div e esta dentro da div geral
            pergunta_quiz_create_p.innerHTML = titulo_question;
            pergunta_quiz_create_div.classList.add("pergunta-quizz");
            pergunta_quiz_create_div.setAttribute("style", style_background_line);
            pergunta_quiz_create_div.appendChild(pergunta_quiz_create_p);
            conteudo_quiz_create_div.classList.add("conteudo-quizz");
            conteudo_quiz_create_div.id = "caixa_pergunta";
            conteudo_quiz_create_div.appendChild(pergunta_quiz_create_div);
            conteudo_quiz_create_div.appendChild(img_opcoes_create_div);
            document.getElementById("perguntas_quiz").appendChild(conteudo_quiz_create_div);
            for (let b=0; b < answers_question.length; b++){
                let text_answer = answers_question[b].text;
                let image_answer = answers_question[b].image;
                let is_correct_answer = answers_question[b].isCorrectAnswer;
                let opcoes_create_btn = document.createElement("button");
                let opcoes_create_img = document.createElement("img");
                let opcoes_create_p = document.createElement("p");
                opcoes_create_btn.classList.add("button-quiz");
                opcoes_create_btn.setAttribute("onclick", "verificar_resposta()");
                opcoes_create_img.setAttribute("src", image_answer);
                opcoes_create_img.setAttribute("alt", "");
                opcoes_create_p.innerHTML = text_answer;
                opcoes_create_btn.classList.add("opcoes");
                opcoes_create_btn.appendChild(opcoes_create_img);
                opcoes_create_btn.appendChild(opcoes_create_p);
                if (is_correct_answer == true){
                    opcoes_create_btn.id = "1";
                }
                else{
                    opcoes_create_btn.id = "0";
                }
                img_opcoes_create_div.appendChild(opcoes_create_btn);
            }
        }
        document.getElementById("pag_inicial").style.display = "none";
        document.getElementById("pag_quiz").style.display = "flex";
    }
    function error(response){
        console.log(response.status);
    }
}