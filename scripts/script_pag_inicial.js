let token_api = "Ig05OI8F18Lp90ZDISfjWMt8";

atualizar_quizzes();

function atualizar_quizzes(){
    axios.defaults.headers.common['Authorization'] = token_api;
    let send = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
    console.log("Estou atualizando os quizzes");
    send.then(sucess);
    send.catch(error);
    function sucess(response){
        console.log(response.data);
    }
    function error(response){
        console.log(response.status);
    }
    document.getElementById("seus_quizzes_criar").style.display = "none";
    document.getElementById("seus_quizzes_mostrar").style.display = "flex";
}