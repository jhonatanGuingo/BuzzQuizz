function atualizar_seus_quizzes(){
    axios.defaults.headers.common['Authorization'] = 'seuTokenDeAcessoNoHUB';
    let send = axios.get('https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes');
    document.getElementById("seus_quizzes_criar").style.display = "none";
    document.getElementById("seus_quizzes_mostrar").style.display = "flex";
}