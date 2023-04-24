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
let perguntas = [];
let respostas = [];

let objeto = {
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 2",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 3",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
}

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
}

//verificar niveis do quizz
function verificarNivelQuizz() {

    let titulo;
    let acertosMin;
    let url;
    let descricao;
    let verificadas = 0;

    let niveis = [];
    let nivel;

    let check = false;

    for(let i = 1; i <= numNiveis; i++){

        let niveiss = document.querySelector(`.nivel${i} .colapsarNiveis`);
        titulo = niveiss.querySelector('.titulo').value;
        acertosMin = niveiss.querySelector('.porcentagem').value;
        url = niveiss.querySelector(`.imagem`).value;
        descricao = niveiss.querySelector(`.descricao`).value;

        if (acertosMin === "0"){
           check = true;
        }

        if (dadosNiveisValidos (titulo, acertosMin, url, descricao)) {
            verificadas++;

            nivel = {
                image: url,
                minValue: Number(acertosMin),
                text: descricao,
                title: titulo
            }

            niveis.push(nivel);
        }
    }

    if((check === true) && (verificadas == numNiveis)){
        for (let j=0; j<niveis.length; j++){
            objeto.levels[j].title = niveis[j].title;
            objeto.levels[j].image = niveis[j].image;
            objeto.levels[j].text = niveis[j].text;
            objeto.levels[j].minValue = niveis[j].minValue;
        }
        console.log(objeto);
        altFinalizarQuizz();
    } else {
        alertErro("criarNiveis");
    }
}

//valida URL
    function validarURL(url) {
      let regex = /^(ftp|http|https):\/\/[^ "]+$/;
      return regex.test(url);
     }

//verificações gerais

function tituloNivelValido(titulo){
    if(titulo.length > 10){
        return true;
    }
    return false;
}

function porcentagemNivelValida(acertosMin) {
    if(acertosMin >= 0 && acertosMin <= 100 && acertosMin !== ''){
        return true;
    }
    return false;
}

function descricaoNiveisValida(descricao){
    if(descricao.length >= 30){
        return true;
    }
    return false;
}

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

//verifica dados dos níveis
function dadosNiveisValidos (titulo, acertosMin, url, descricao) {
    return (tituloNivelValido(titulo)
        && porcentagemNivelValida(acertosMin)
        && urlValida(url)
        && descricaoNiveisValida(descricao))
}

//verifica dados das respostas
function dadosRespostasValidos (titulo, cor, respostaCorreta, resposta1, resposta2, resposta3, URLCorreta, URL1, URL2, URL3) {
    
    return (tituloPerguntasValido(titulo) && corValida(cor) && respostaValida(respostaCorreta, resposta1, resposta2, resposta3)
        && urlValida(URLCorreta) && (urlValida(URL1) || urlValida(URL2) || urlValida(URL3)) && cardValido(resposta1, URL1) 
        && cardValido(resposta2, URL2) && cardValido(resposta3, URL3));
}

//verifica validações perguntas
function verificarPerguntasCriadas() {
        let perguntas = [];
        let verificadas = 0;
    
        for (let i = 1; i <= numPerguntas; i++) {
            
            let pergunta = document.querySelector(`.pergunta${i} .colapsarPerguntas`);

            let titulo = pergunta.querySelector(".titulo").value;
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
    
                perguntas.push(perguntaArray);
            }
        }
        if (verificadas == numPerguntas) {
            for (let j=0; j<numPerguntas; j++){
                objeto.questions[j].title = perguntas[j].title;
                objeto.questions[j].color = perguntas[j].color;
                for (let k=0; k<respostas.length; k++){
                    objeto.questions[j].answers[k].text=respostas[k].text;
                    objeto.questions[j].answers[k].image=respostas[k].image;
                    objeto.questions[j].answers[k].isCorrectAnswer = respostas[k].isCorrectAnswer;
                }
            }
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
    let urlValida = validarURL(urlTitulo);

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
        objeto.title = titulo;
        objeto.image = urlTitulo;
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
        <input data-test="title-input" class="titulo" type="text" placeholder="Título do seu quizz">
        <input data-test="img-input" class="urlTitulo" type="text" placeholder="URL da imagem do seu quizz">
        <input data-test="questions-amount-input" class="numPerguntas" type="text" placeholder="Quantidade de perguntas do quizz">
        <input data-test="levels-amount-input" class="numNiveis" type="text" placeholder="Quantidade de níveis do quizz">
    </div>
    <button onclick ="validacoes()" class="prosseguir" data-test="go-create-questions">Prosseguir pra criar perguntas</button>
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
        <div class="pergunta${i+1} estilo" data-test="question-ctn">
            <p onclick="colapsarPerguntas(this)">Pergunta ${i+1}<img class="icon esconder" src="./imagens/ícone.png"></p>
            <div class="colapsarPerguntas">
            <input data-test="question-input" class="titulo" type="text" placeholder="Texto da pergunta">
            <input data-test="question-color-input" class="cor" type="text" placeholder="Cor de fundo da pergunta">
            <p>Resposta Correta</p>
            <input data-test="correct-answer-input" class="respostaCorreta" type="text" placeholder="Resposta correta">
            <input data-test="correct-img-input" class="urlCorreta" type="text" placeholder="URL da imagem">
            <p>Respostas Incorretas</p>
            <input data-test="wrong-answer-input" class="resposta1" type="text" placeholder="Resposta incorreta 1">
            <input data-test="wrong-img-input" class="URL1" type="text" placeholder="URL da imagem 1">
            <input data-test="wrong-answer-input" class="resposta2" type="text" placeholder="Resposta incorreta 2">
            <input data-test="wrong-img-input" class="URL2" type="text" placeholder="URL da imagem 2">
            <input data-test="wrong-answer-input" class="resposta3" type="text" placeholder="Resposta incorreta 3">
            <input data-test="wrong-img-input" class="URL3" type="text" placeholder="URL da imagem 3">
            </div>
        </div>
        `);
        }else{
            perguntasCriadas.push(`
<<<<<<< HEAD
         <div class="pergunta${i+1} estilo" data-test="question-ctn">
            <p onclick="colapsarPerguntas(this)">Pergunta ${i+1}<img class="icon" src="./imagens/ícone.png"></p>
=======
         <div data-test="question-ctn" class="pergunta${i+1} estilo">
            <p onclick="colapsarPerguntas(this)">Pergunta ${i+1}<img data-test="toggle" class="icon" src="./imagens/ícone.png"></p>
>>>>>>> e94266e10137cf83a0235b5dd44adfb3c0b56123
            <div class="colapsarPerguntas esconder">
            <input data-test="question-input" class="titulo" type="text" placeholder="Texto da pergunta">
            <input data-test="question-color-input" class="cor" type="text" placeholder="Cor de fundo da pergunta">
            <p>Resposta Correta</p>
            <input data-test="correct-answer-input" class="respostaCorreta" type="text" placeholder="Resposta correta">
            <input data-test="correct-img-input" class="urlCorreta" type="text" placeholder="URL da imagem">
            <p>Respostas Incorretas</p>
            <input data-test="wrong-answer-input" class="resposta1" type="text" placeholder="Resposta incorreta 1">
            <input data-test="wrong-img-input" class="URL1" type="text" placeholder="URL da imagem 1">
            <input data-test="wrong-answer-input" class="resposta2" type="text" placeholder="Resposta incorreta 2">
            <input data-test="wrong-img-input" class="URL2" type="text" placeholder="URL da imagem 2">
            <input data-test="wrong-answer-input" class="resposta3" type="text" placeholder="Resposta incorreta 3">
            <input data-test="wrong-img-input" class="URL3" type="text" placeholder="URL da imagem 3">
            </div>
        </div>
        `);
        }
    }

    for(let j=0; j<perguntasCriadas.length; j++){
        perguntas.innerHTML+=perguntasCriadas[j];
    }
    perguntas.innerHTML+=`
    <button data-test="go-create-levels" onclick ="verificarPerguntasCriadas()" class="prosseguir">Prosseguir pra criar níveis</button> 
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
        <div data-test="level-ctn" class="nivel${i+1} estiloNivel">
        <p onclick="colapsarNiveis(this)">Nível ${i+1}<img data-test="toggle" class="icon esconder" src="./imagens/ícone.png"></p>
        <div class="colapsarNiveis">
        <input data-test="level-input" class="titulo" type="text" placeholder="Título do nível">
        <input data-test="level-percent-input" class="porcentagem" type="text" placeholder="% de acerto mínima">
        <input data-test="level-img-input" class="imagem" type="text" placeholder="URL da imagem do nível">
        <input data-test="level-description-input" class="descricao" type="text" placeholder="Descrição do nível">
        </div>
        </div>
        `);
        }else{
            niveisCriados.push(`
        <div data-test="level-ctn" class="nivel${i+1} estiloNivel">
        <p onclick="colapsarNiveis(this)">Nível ${i+1}<img data-test="toggle" class="icon" src="./imagens/ícone.png"></p>
        <div class="colapsarNiveis esconder">
        <input data-test="level-input" class="titulo" type="text" placeholder="Título do nível">
        <input data-test="level-percent-input" class="porcentagem" type="text" placeholder="% de acerto mínima">
        <input data-test="level-img-input" class="imagem" type="text" placeholder="URL da imagem do nível">
        <input data-test="level-description-input" class="descricao" type="text" placeholder="Descrição do nível">
        </div>
        </div>
        `);
        }
    }
    for(let j=0; j<niveisCriados.length; j++){
        niveis.innerHTML+=niveisCriados[j];
    }

    niveis.innerHTML+=`
    <button data-test="go-finish" onclick ="verificarNivelQuizz()" class="prosseguir">Finalizar Quizz</button>
    `
    niveis.classList.add('centralizar');
}
//muda para tela de finalização da criação de um quizz
function altFinalizarQuizz(){
    let promessa=axios.post("https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes", objeto);
    let=niveis = document.getElementById('niveis_do_quizz') ;
    niveis.classList.remove('centralizar');
    niveis.classList.add('esconder');
    let finalizar = document.getElementById('finalizar_quizz');
    finalizar.innerHTML+=`
    <p>Seu quizz está pronto!</p>
    <div data-test="success-banner" class="banner">
    <img src="${urlTitulo}">
    <h3>${titulo}</h3>
    </div>
    <button data-test="go-quiz" onclick ="acessarQuizz()" class="prosseguir-finalizar">Acessar Quizz</button>
    <div data-test="go-home"onclick ="voltarPagInicial()" >Voltar pra home</div>
    `
    finalizar.classList.add('centralizar');
    // Philippe: adicionei essas linhas para poder armazenar os Id's dos quizzes criados!
    promessa.then(sucesso);
    function sucesso(resposta){
        user_quizzes.push(resposta.id);
        localStorage.setItem("ids_quizzes_criados", toString(user_quizzes));
    }
    //
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
            pergunta_quiz_create_div.setAttribute('data-test','question-title');
            conteudo_quiz_create_div.classList.add("conteudo-quizz");
            conteudo_quiz_create_div.id = "caixa_pergunta";
            conteudo_quiz_create_div.setAttribute('data-test','question');
            conteudo_quiz_create_div.appendChild(pergunta_quiz_create_div);
            conteudo_quiz_create_div.appendChild(img_opcoes_create_div);
            document.getElementById("perguntas_quiz").appendChild(conteudo_quiz_create_div);
            let indexs = [];
            for (let c = 0; c < answers_question.length; c++){
                indexs.push(c);
            }
            function comparador() { 
                return Math.random() - 0.5;
            }
            indexs.sort(comparador);
            for (let d = 0; d < indexs.length; d++){
                let b = indexs[d];
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
                opcoes_create_p.setAttribute('data-test','answer-text');
                opcoes_create_btn.classList.add("opcoes");
                opcoes_create_btn.setAttribute('data-test','answer');
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