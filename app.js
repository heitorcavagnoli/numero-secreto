//Case Sensitive: maísculos e minusculas fazem diferença

// array.push(X)                adiciona elemento em uma array
// array.pop()                  REMOVE o último elemento da array
// array.length;                retorna a quantidade de elementos na array
// array[array.length - 1]      retorna o último elemento da array    

let listaDeNumerosSorteados = [];
//[ ] cria uma Array (lista)
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let numeroDeTentativas = 1;

function exibirTextoNaTela(tag, texto) {
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

//verifica o chute com o número gerado
function verificarChute() {
    let chute = document.querySelector('input').value;

//define o chute com o valor inseridor no input no html

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = numeroDeTentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${numeroDeTentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        (chute > numeroSecreto) ? exibirTextoNaTela('p', 'O número secreto é menor') : exibirTextoNaTela('p', 'O número secreto é maior');
    }
    numeroDeTentativas++;
    limparCampo();
}

// função que gera um número aleatório

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

//length retorna a quantidade de elementos na lista

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

//verifica se a quantidade de elementos na lista é igual ao número limite de elementos
//caso seja igual

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }

//IF verifica se o número gerado (numeroEscolhido) já consta presente na array,
//caso já exista, retorna a função e gera um novo número.
//ELSE adiciona o número gerado na array, mostra no console e retorna o número gerado (numeroEscolhido).

}

//limpa o input
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//reinicia todas as funções do jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroDeTentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}