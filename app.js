// Iniciando variavel que controla a quantidade de jogadas
let maximoTentativas = 0

// Função para limpar campo sempre que houver interação
function limparCampo() {
    let reset = document.querySelector('input');
    reset.value = '';
}

// Testando se o jogo esta no começo para chamar a função de setup
if (maximoTentativas == 0) {
    setup();
}

// Função que irá possibilitar o usuário esolhar com quantos numeros deseja jogar
function setup() {
    exibirTextoNaTela('h1' , 'Bem-vindo');
    exibirTextoNaTela('p' , 'Escolha com quantos numeros deseja jogar!');
    document.getElementById('setup').addEventListener('click', configurarMaximo, false); // iniciando listener para configurar maximo ao clica no botão iniciar
}

// Função para realizar troca de ID do botão de setup para chute
function trocarIdChutar() {
    var elemento = document.getElementById('setup');
    elemento.id = 'chutar'; // Troca o ID do elemento
    console.log('ID trocado para:', elemento.id);
}

// Função para exibição de textos dinamicos
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

// Função que realiza procedimento de configuração do valor maximo informado pelo usuário
function configurarMaximo() {
    maximoTentativas = document.querySelector('input').value;
    document.getElementById('setup').removeEventListener('click', configurarMaximo, false); // removendo o listener de ação do botão iniciar
    limparCampo();
    trocarIdChutar();
    gameStart();
    return maximoTentativas;
}

// Iniciando array de números sorteados
let listaDeNumerosSorteados = [];

// Função do jogo rodando após setup inicial do usuario
function gameStart() {
    document.getElementById('chutar').addEventListener('click', verificarChute, false);
    document.getElementById('chutar').innerHTML = 'Chutar';
    let numeroSecreto = gerarNumeroAleatorio();
    let mensagemInicial = `Escolha um numero entre 1 e ${maximoTentativas}`;
    
    // Função que exibe a mensagem inicial
    function exibirMensagemInicial() {
        exibirTextoNaTela('h1' , 'Jogo do número secreto');
        exibirTextoNaTela('p' , mensagemInicial);
    }
    
    // Chamada na função para exibir a mensagem inicial
    exibirMensagemInicial();
    
    // Iniciando variavel com a contagem de chutes
    let contarChute = 1;

    // Iniciando o listener para ao clicar no botão ele processe a função de verificação de chute
    document.getElementById('chutar').addEventListener('click', verificarChute, false);

    // Função de verificação do chute. Irá comparar se o chut esta certo, se não vai responder se o numero é maior ou menor e adicionar +1 no numero de tentativas
    function verificarChute() {
        console.log(`contarChute = ${contarChute}`);
        let chute = document.querySelector('input').value;
        let palavra = contarChute > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou em ${contarChute} ${palavra}!`;
        if (chute == numeroSecreto) {
            exibirTextoNaTela('h1' , 'Você acertou!');
            exibirTextoNaTela('p' , mensagemTentativas);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('chutar').setAttribute('disabled',true);
            document.getElementById('chutar').removeEventListener('click', verificarChute, false); // caso acerte o listener para o botão chute é encerrado
        } else if (chute > numeroSecreto) {
                contarChute++;
                let mensagemErro = `Tentativa ${contarChute}`;
                exibirTextoNaTela('h1' , mensagemErro);
                exibirTextoNaTela('p' , 'O Número Secreto é Menor');
                limparCampo();
            } else {
                contarChute++;
                let mensagemErro = `Tentativa ${contarChute}`;
                exibirTextoNaTela('h1' , mensagemErro);
                exibirTextoNaTela('p' , 'O Número Secreto é Maior');
                limparCampo();
            }
    }
    
    // Função responsável por gerar o numero aleatoriamente de acordo com a quantidade escolhida pelo usuário.
    function gerarNumeroAleatorio() {
        let numeroEscolhido = parseInt(Math.random() * maximoTentativas + 1);
        if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //testa se o numero ja foi jogado na sessão para que não se repita. todas as possibilidades sejam jogadas o jogo é reiniciado
            return gerarNumeroAleatorio();
        } else {
            listaDeNumerosSorteados.push(numeroEscolhido);
            return numeroEscolhido;
        }
    }
}

// Função que permite o reinicio do jogo após acerto
function reiniciarJogo() {
    contarChute = 1;
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    document.getElementById('chutar').removeAttribute('disabled');
    if (listaDeNumerosSorteados.length == maximoTentativas) { // Se todas as possibilidades de número ja foram jogadas então zera o array para começar do zero.
        listaDeNumerosSorteados = [];
    }

    // Função que realiza a troca do id do botão de chutar para setup
    function trocarIdSetup() {
        var elemento = document.getElementById('chutar');
        elemento.id = 'setup'; // Troca o ID do elemento
        console.log('ID trocado para:', elemento.id);
    }

    document.getElementById('chutar').innerHTML = 'Iniciar'; // recoloca o nome iniciar no lugar de chutar
    trocarIdSetup(); // chama função para troca do id
    setup(); // inicia o jogo novamente
}