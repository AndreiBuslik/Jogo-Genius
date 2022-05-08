let order = [];
let clickedOrder = [];
let score = 0;
let scoreOnScreen = document.querySelector('#score');
let sound = null;
let getClick = false;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const startButton = document.querySelector('#start');


const greenSound = document.querySelector('#greenSound');
const redSound = document.querySelector('#redSound');
const blueSound = document.querySelector('#blueSound');
const yellowSound = document.querySelector('#yellowSound');
const loseGame = document.querySelector("#loseGame");
const correct = document.querySelector("#correct");


// Cria ordem aleatória de cores
let shuffleOrder = () => {

    let colorOrder = Math.floor(Math.random() * 4);
    order.push(colorOrder);
    clickedOrder = [];

    for(let i in order){

        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1, order[i]);
    }

};

// Ascende a próxima cor
let lightColor = (element, number, color) => { 

    number = number * 600;
    
    setTimeout(() => {
        sound = chooseSound(color);
        sound.play();
        element.classList.add('selected');

    }, number - 400);

    setTimeout(() => {
        sound.pause();
        element.classList.remove('selected');

    }, number);


};

// Checa se o botão clicado é o mesmo da ordem gerada
let checkOrder = () =>{

    for(let i in clickedOrder){

        if(clickedOrder[i] != order[i]){

            gameOver();
            break;

        }

    }

    if(clickedOrder.length == order.length){

        scoreOnScreen.innerHTML = score;
        correct.play();
        getClick = false;
        nextLevel();

    }

};

// Função para capturar o click do jogador
let click = (color) => {

    clickedOrder.push(color);
    createColorElement(color).classList.add('selected');
    sound = chooseSound(color);
    sound.play();

    setTimeout(() => {

        createColorElement(color).classList.remove('selected');
        checkOrder();
        sound.pause();
    }, 250);


};

// Função que retorna a cor

let createColorElement = (color) => {

    let retorno = null;
    switch(color){

        case 0:

            retorno = green;

        break;

        case 1:

            retorno = red;
        
        break;

        case 2:

            retorno = yellow;

        break;

        case 3:
        
            retorno = blue;
        
        break;

        default:

            alert(`Ocorreu um erro ao buscar as cores! Reiniciando.`);
            location.reload(true);

            return;

    }

    return retorno;

};

// Função que gera a ordem para o próximo nível

let nextLevel  = () => {

    score++;
    shuffleOrder();
    getClick = true;

};

// Função para escolher o som que será tocado
let chooseSound = (color) => { 

    let returnSound;

    switch(color){

        case 0:

            returnSound = greenSound;
        
        break;

        case 1:

            returnSound = redSound;
        
        break;

        case 2:

            returnSound = yellowSound;
        
        break;

        case 3:

            returnSound = blueSound;
        
        break;

        default:

            alert(`Ocorreu um erro ao buscar os áudios! Reiniciando.`);
            location.reload(true);

            return;

    }

    return returnSound;

};

// Função para o fim do jogo

let gameOver = () => {

    order = [];
    getClick = false;
    scoreOnScreen.innerHTML = "_ _";
    if(sound !== null){
        sound.pause();
    }
    loseGame.play();

};

// Função que inicia o jogo
let playGame = () => {
    
    order = [];
    clickedOrder = [];
    scoreOnScreen.innerHTML = "_ _";
    score = 0;
    getClick = false;
    nextLevel();

};


green.onclick = () => {
    
    if(getClick){
        
        click(0);
    
    }

};

red.onclick = () => {
    
    if(getClick){
        
        click(1);

    }

};

yellow.onclick = () => {
    
    if(getClick){
        
        click(2);

    }

};

blue.onclick = () => {
    
    if(getClick){
        
        click(3);

    }

};

startButton.onclick = () => playGame();