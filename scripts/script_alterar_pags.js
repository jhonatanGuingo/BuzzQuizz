let n_questions = 0;
let levels_quiz = "";
let idAnterior = '';
let quiz_id = 0;
let a = 0;
let urlTitulo = '';
let titulo='';
let numPerguntas=null;
let numNiveis=null;
let perguntasCriadas=[];
let niveisCriados=[];

var perguntas = [];
var respostas = [];

//mostra um alert com possíveis erros da página em questão
function alertErro(erro) {
    if (erro === "dadosBasicos") {
        alert(`Dados incorretos, por favor verifique se:\n
        Todos os campos estão preenchidos,
        O título tem entre 20 e 65 caracteres,
        A URL é válida,
        A quantidade de perguntas é no mínimo 3,
        A quantidade de níveis é no mínimo 2`);
    }
    else if (erro === "criarPerguntas") {
        alert(`Dados incorretos, por favor verifique se:\n
        Todos os campos estão preenchidos,
        O título tem no mínimo 20 caracteres,
        É uma cor em hexadecimal,
        Tem pelo menos 1 resposta correta e 1 errada por pergunta,
        As respostas correspondem com as URL`);
    }
    else if (erro === "criarNiveis") {
        alert(`Dados incorretos, por favor verifique se:\n
        Todos os campos estão preenchidos,
        O título tem no mínimo 10 caracteres,
        A porcentagem está entre 0 e 100,
        Tem um nível 0,
        A descrição tem no mínimo 30 caracteres`);
    }
    else {
        alert("Sentimos muito, não foi possível criar o quizz.");
        colocarTelaCarregando();
        buscarQuizzes();
    }  
}

//valida URL
    function validarURL(url) {
      var regex = /^(ftp|http|https):\/\/[^ "]+$/;
      return regex.test(url);
     }

//verificações gerais
function tituloPerguntasValido (string) {
    if (string.length >= 20) {
        return true;
    }
    return false;
}

function corValida (cor) {
    let hex = /^#[0-9A-F]{6}$/i;
    return (hex.test(cor));
}

function respostaValida (rCorreta, r1, r2, r3) {
    return (rCorreta !== '' && (r1 !== '' || r2 !== '' || r3 !== ''));
}

function cardValido (resposta, url) {
    return ((resposta !== '' && url !== '') || (resposta === '' && url === ''));
}
function urlValida(string){
        
    try {
        let url = new URL(string)
        return true;
    } catch(err) {
            return false;   
    }
}

//verifica dados das respostas
function dadosRespostasValidos (titulo, cor, respostaCorreta, resposta1, resposta2, resposta3, URLCorreta, URL1, URL2, URL3) {
    
    return (tituloPerguntasValido(titulo) && corValida(cor) && respostaValida(respostaCorreta, resposta1, resposta2, resposta3)
        && urlValida(URLCorreta) && (urlValida(URL1) || urlValida(URL2) || urlValida(URL3)) && cardValido(resposta1, URL1) 
        && cardValido(resposta2, URL2) && cardValido(resposta3, URL3));
}

//verifica validações perguntas
function verificarPerguntasCriadas() {
        let perguntas = {questions: []};
        let verificadas = 0;
    
        for (let i = 1; i <= numPerguntas; i++) {
            
            console.log(i);
            let pergunta = document.querySelector(`.pergunta${i} .colapsarPerguntas`);
            console.log(pergunta);

            let titulo = pergunta.querySelector(".titulo").value;
            console.log(titulo);
            let cor = pergunta.querySelector(".cor").value;
            let respostaCorreta = pergunta.querySelector(".respostaCorreta").value;
            let URLCorreta = pergunta.querySelector(".urlCorreta").value;
            let resposta1 = pergunta.querySelector(".resposta1").value;
            let URL1 = pergunta.querySelector(".URL1").value;
            let resposta2 = pergunta.querySelector(".resposta2").value;
            let URL2 = pergunta.querySelector(".URL2").value;
            let resposta3 = pergunta.querySelector(".resposta3").value;
            let URL3 = pergunta.querySelector(".URL3").value;
    
            if (dadosRespostasValidos(titulo, cor, respostaCorreta, resposta1, resposta2, resposta3, URLCorreta, URL1, URL2, URL3)){
                verificadas++;
    
                let rsp1 = {
                    image: URLCorreta,
                    text: respostaCorreta,
                    isCorrectAnswer: true
                }
    
                let rsp2 = {
                    image: URL1,
                    text: resposta1,
                    isCorrectAnswer: false
                }
    
                let rsp3 = {
                    image: URL2,
                    text: resposta2,
                    isCorrectAnswer: false
                }
    
                let rsp4 = {
                    image: URL3,
                    text: resposta3,
                    isCorrectAnswer: false
                }
    
                let respostas = [rsp1];
    
                if (rsp2.image !== '' && rsp2.text !== '') {
                    respostas.push(rsp2);
                }
                if (rsp3.image !== '' && rsp3.text !== '') {
                    respostas.push(rsp3);
                }
                if (rsp4.image !== '' && rsp4.text !== '') {
                    respostas.push(rsp4);
                }
    
                let perguntaArray = {
                    answers: respostas,
                    color: cor,
                    title: titulo
                };
    
                perguntas.questions.push(perguntaArray);
            }
        }
    
        console.log(verificadas);
        if (verificadas == numPerguntas) {
            altCriarNiveis();
        } else {
            alertErro("criarPerguntas");
        }
    }
      

//verifica validações informações principais
function validacoes(){
    //pegando o título digitado
    let tit=document.querySelector('.titulo');
    titulo = tit.value;
    let caracteres=titulo.length;

    //pegando a URL digitada
    let url=document.querySelector('.urlTitulo');
    urlTitulo = url.value;
    console.log(urlTitulo);
    let urlValida = validarURL(urlTitulo);
    console.log(urlValida);

    //pegando o numero de perguntas digitado
    let perguntas=document.querySelector('.numPerguntas');
    numPerguntas = perguntas.value;
    
    //pegando o numero de niveis digitado
    let niveis=document.querySelector('.numNiveis');
    numNiveis = niveis.value;


    //validar...
    if ((numPerguntas<3) || (numNiveis<2) || (caracteres<20 || caracteres>65) || (urlValida===false)){
        alertErro("dadosBasicos");
    }else{
        altCriarPerguntas();
    }
}

//oculta as informações ao clicar
function colapsarPerguntas(x){
    let icone = x.querySelector('img');
    let conteudo = x.parentNode;
    let colapsar = conteudo.querySelector('.colapsarPerguntas:nth-child(2)');
    colapsar.classList.toggle('esconder');
    if (colapsar.classList.contains('esconder')){
        icone.classList.remove('esconder');
    }else{
        icone.classList.add('esconder');
    }
}
function colapsarNiveis(x){
    let icone = x.querySelector('img');
    let conteudo = x.parentNode;
    let colapsar = conteudo.querySelector('.colapsarNiveis:nth-child(2)');
    colapsar.classList.toggle('esconder');
    if (colapsar.classList.contains('esconder')){
        icone.classList.remove('esconder');
    }else{
        icone.classList.add('esconder');
    }
}
//muda para a tela de criação de quizz
function altCriarQuizz(){
    let=pagInicial = document.getElementById("pag_inicial"); 
    pagInicial.classList.add('esconder');
    let info = document.getElementById('info_do_quizz');
    info.innerHTML+=`
    <h1>Comece pelo começo</h1>
    <div class="infos">
        <input class="titulo" type="text" placeholder="Título do seu quizz">
        <input class="urlTitulo" type="text" placeholder="URL da imagem do seu quizz">
        <input class="numPerguntas" type="text" placeholder="Quantidade de perguntas do quizz">
        <input class="numNiveis" type="text" placeholder="Quantidade de níveis do quizz">
    </div>
    <button onclick ="validacoes()" class="prosseguir">Prosseguir pra criar perguntas</button>
    `
    info.classList.add('centralizar');
}
//muda para tela de criação de perguntas
function altCriarPerguntas(){
    let=criarQuizz = document.getElementById('info_do_quizz') ;
    criarQuizz.classList.remove('centralizar');
    criarQuizz.classList.add('esconder');
    let perguntas = document.getElementById('perguntas_do_quizz');
    for(let i=0; i<numPerguntas; i++){
        if(i==0){
            perguntasCriadas.push(`
        <div class="pergunta${i+1} estilo">
            <p onclick="colapsarPerguntas(this)">Pergunta ${i+1}<img class="icon esconder" src="./imagens/ícone.png"></p>
            <div class="colapsarPerguntas">
            <input class="titulo" type="text" placeholder="Texto da pergunta">
            <input class="cor" type="text" placeholder="Cor de fundo da pergunta">
            <p>Resposta Correta</p>
            <input class="respostaCorreta" type="text" placeholder="Resposta correta">
            <input class="urlCorreta" type="text" placeholder="URL da imagem">
            <p>Respostas Incorretas</p>
            <input class="resposta1" type="text" placeholder="Resposta incorreta 1">
            <input class="URL1" type="text" placeholder="URL da imagem 1">
            <input class="resposta2" type="text" placeholder="Resposta incorreta 2">
            <input class="URL2" type="text" placeholder="URL da imagem 2">
            <input class="resposta3" type="text" placeholder="Resposta incorreta 3">
            <input class="URL3" type="text" placeholder="URL da imagem 3">
            </div>
        </div>
        `);
        }else{
            perguntasCriadas.push(`
         <div class="pergunta${i+1} estilo">
            <p onclick="colapsarPerguntas(this)">Pergunta ${i+1}<img class="icon" src="./imagens/ícone.png"></p>
            <div class="colapsarPerguntas esconder">
            <input class="titulo" type="text" placeholder="Texto da pergunta">
            <input class="cor" type="text" placeholder="Cor de fundo da pergunta">
            <p>Resposta Correta</p>
            <input class="respostaCorreta" type="text" placeholder="Resposta correta">
            <input class="urlCorreta" type="text" placeholder="URL da imagem">
            <p>Respostas Incorretas</p>
            <input class="resposta1" type="text" placeholder="Resposta incorreta 1">
            <input class="URL1" type="text" placeholder="URL da imagem 1">
            <input class="resposta2" type="text" placeholder="Resposta incorreta 2">
            <input class="URL2" type="text" placeholder="URL da imagem 2">
            <input class="resposta3" type="text" placeholder="Resposta incorreta 3">
            <input class="URL3" type="text" placeholder="URL da imagem 3">
            </div>
        </div>
        `);
        }
    }

    for(let j=0; j<perguntasCriadas.length; j++){
        perguntas.innerHTML+=perguntasCriadas[j];
    }
    perguntas.innerHTML+=`
    <button onclick ="verificarPerguntasCriadas()" class="prosseguir">Prosseguir pra criar níveis</button> 
    `
    perguntas.classList.add('centralizar');
}
//muda para tela de criação de níveis
function altCriarNiveis(){
    let=perguntas = document.getElementById('perguntas_do_quizz') ;
    perguntas.classList.remove('centralizar');
    perguntas.classList.add('esconder');
    let niveis = document.getElementById('niveis_do_quizz');
    for (let i=0; i<numNiveis; i++){
        if (i==0){
            niveisCriados.push(`
        <div class="nivel">
        <p onclick="colapsarNiveis(this)">Nível ${i+1}<img class="icon esconder" src="./imagens/ícone.png"></p>
        <div class="colapsarNiveis">
        <input type="text" placeholder="Título do nível">
        <input type="text" placeholder="% de acerto mínima">
        <input type="text" placeholder="URL da imagem do nível">
        <input type="text" placeholder="Descrição do nível">
        </div>
        </div>
        `);
        }else{
            niveisCriados.push(`
        <div class="nivel">
        <p onclick="colapsarNiveis(this)">Nível ${i+1}<img class="icon" src="./imagens/ícone.png"></p>
        <div class="colapsarNiveis esconder">
        <input type="text" placeholder="Título do nível">
        <input type="text" placeholder="% de acerto mínima">
        <input type="text" placeholder="URL da imagem do nível">
        <input type="text" placeholder="Descrição do nível">
        </div>
        </div>
        `);
        }
    }
    for(let j=0; j<niveisCriados.length; j++){
        niveis.innerHTML+=niveisCriados[j];
    }

    niveis.innerHTML+=`
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
    location.reload(true);
}
//acessa o quiz que acabou de ser criado 
function acessarQuizz(){
    alert("a fazer");
}

function alt_paginic_quiz(){
    if (a == 0){
        let id = event.target.id;
        quiz_id = id;
    }
    let send = axios.get("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/" + quiz_id);
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
        let div_img_create_div = document.createElement("div");
        // Formatação da imagem no topo
        img_geral_create_img.classList.add("img-quizz-topo");
        img_geral_create_img.setAttribute("src", image_quiz);
        img_geral_create_img.setAttribute("alt", "");
        div_img_create_div.appendChild(img_geral_create_img);
        // Formatação do título no topo
        title_geral_create_span.innerHTML = titulo_quiz;
        div_img_create_div.appendChild(title_geral_create_span);
        div_img_create_div.classList.add("filtro");
        document.getElementById("header_quiz").appendChild(div_img_create_div);
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
            if (color_question == "rgb(255, 255, 255)" || color_question == "#FFFFFF"){
                pergunta_quiz_create_p.setAttribute("style", "color: rgb(0, 0, 0);");
            }
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

function alt_quiz_home(){
    window.location.reload();
}

function alt_quiz_quiz(){
    a = 1;
    document.getElementById("perguntas_quiz").innerHTML = "";
    alt_paginic_quiz();
}