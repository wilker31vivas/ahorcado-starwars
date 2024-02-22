const buttonSpain = document.querySelector(".button-spain");
const buttonBrazil = document.querySelector(".button-brazil");
const buttonUsa = document.querySelector(".button-usa");

function spain(){
    const lobbyTitle = document.querySelector("#lobby__title");

    lobbyTitle.innerHTML = "Palabras Galacticas";

    const buttonStart = document.querySelector(".lobby__btn");
    buttonStart.outerHTML = `<a href="index-game-es.html" class="lobby__btn"><span>Jugar</span></a>`
    
    const text = document.querySelector(".text")
    text.innerHTML = "¡Que disfrutes del juego y que la Fuerza te acompañe!"

    const copyright = document.querySelector(".copyright");
    copyright.innerHTML = `Hecho por <a href="https://www.instagram.com/wilker31vivas/" target="_blank" class="copyright-a">Wilker</a>`
    language = "spain"
}

function brazil(){
    const lobbyTitle = document.querySelector("#lobby__title");

    lobbyTitle.innerHTML = "Palavras galacticas";

    const buttonStart = document.querySelector(".lobby__btn");
    buttonStart.outerHTML = `<a href="index-game-pt.html" class="lobby__btn"><span>JOGAR</span></a>`

    const text = document.querySelector(".text")
    text.innerHTML = "¡Que você aproveite o jogo e que a Força esteja com você!"
    

    const copyright = document.querySelector(".copyright");
    copyright.innerHTML = `Feito por <a href="https://www.instagram.com/wilker31vivas/" target="_blank" class="copyright-a">Wilker</a>`
    language = "portugues"
}

function usa(){
    const lobbyTitle = document.querySelector("#lobby__title");

    lobbyTitle.innerHTML = "galactic words";

    const buttonStart = document.querySelector(".lobby__btn");
    buttonStart.outerHTML = `<a href="index-game-en.html" class="lobby__btn"><span>Start</span></a>`

    const text = document.querySelector(".text")
    text.innerHTML = "¡May you enjoy the game and may the Force be with you!"

    const copyright = document.querySelector(".copyright");
    copyright.innerHTML = `Made by <a href="https://www.instagram.com/wilker31vivas/" target="_blank" class="copyright-a">Wilker</a>`
    language = "ingles";
}

buttonSpain.addEventListener("click",spain);
buttonBrazil.addEventListener("click",brazil);
buttonUsa.addEventListener("click", usa);