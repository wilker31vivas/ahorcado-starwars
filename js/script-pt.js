const container = document.querySelector(".container");
const word = document.querySelector(".word__title");
const letters = document.querySelectorAll(".letter");
const img = document.querySelector(".container-img__img");
const timeTextLose = document.querySelector(".container__time-lose");
const timeTextWin = document.querySelector(".container__time-win");
const loseAlert = document.getElementById('lose');
const audioFondo =  document.getElementById("audioFondo");
const audioEfecto = document.getElementById("audioEffect"); 
const iconFondo = document.getElementById("fondo")
const divSound = document.querySelector(".div-sound");
const containerHeart = document.querySelector(".container-heart");
const igText = document.querySelector(".copyright")


//---Temporizador--
let time = {
  segundos: 0,
  minutos: 0
};

let nIntervId;

function temporizador() {
  if (!nIntervId) {
    nIntervId = setInterval(startTempo, 1000);
  }
}

function startTempo() {
    time.segundos++;
    if (time.segundos == 60) {
    	time.minutos++
    	time.segundos = 0;
    }
}

function stop() {
  clearInterval(nIntervId);
  nIntervId = null;
}

//---Temporizador--

//Arrays de palabras por niveles
const nivelesArr = [[
    "luke",
    "leia",
    "hansolo",
    "anakin",
    "obiwan",
    "chewbacca",
    "yoda",
    "rey",
    "ahsoka"
],[
    "Tatooine",
    "Endor",
    "Naboo",
    "Coruscant",
    "Hoth",
    "Kashyyyk",
    "Mustafar",
    "Alderaan",
    "Jakku",
    "Kamino"
],[
    "Mandalorian",
    "Bothan",
    "Ewok",
    "Sullust",
    "Zabrak",
    "Wookiee",
    "Hutt",
    "Twilek",
    "Holocron"
]]

//Variables globales
let numAcertadas = 0;
let nivelActual = 0;
let palabraAdivinada = 0;
let vidas = 3;
let palabraActual;
let palabraInArray;
let aciertos;
let imgIndice;
let funcionEnEjecucion = false;

//--Elegir una palabra aleatoria del array--
function wordRandom(){
    numAleatorio = Math.floor(Math.random() * nivelesArr[nivelActual].length);
    palabraActual = nivelesArr[nivelActual][numAleatorio];
}

//--Funcion de presionar tecla
function pressKey(e) {
    temporizador();
    if(!funcionEnEjecucion) {
        funcionEnEjecucion = true;

        //Ocultar la tecla
        e.target.style.visibility = "hidden";
        let letter = e.target.innerHTML.toLowerCase();
    
        // Bucle para ver si la tecla que presiono coincide con una letra de la palabra
        let error = 0;
        for (let i = 0; i < palabraActual.length; i++) {
            const element = palabraActual[i].toLowerCase();
            if (letter === element) {
                palabraInArray[i + 1] = element;
                aciertos++;
            } else {
                error++;
            }
        }
        
        // Si no coinciden con ninguna letra, pierdes
        if (error === palabraActual.length) {
            if (imgIndice != 8) {
                imgIndice++;
                img.style.backgroundImage = `url(./img/${imgIndice}.png)`;
                // Si pierdes 8 veces
                if (imgIndice == 8) {
                    vidas--
                    containerHeart.children[vidas].style.visibility = "hidden"
                    audioEfecto.play()
                    //si pierdes todas las vidas
                    if(vidas == 0){
                        const titleLose = document.querySelector(".title-lose");
                        const buttonContinue = document.getElementById("continue");
                        const p = document.querySelector(".numAdivinadas")
                        titleLose.innerHTML = "¡Você perdeu suas 3 vidas!"
                        p.innerHTML = `Palavras certas: ${numAcertadas}`;
                        buttonContinue.style.display = "none"

                        loseAlert.style.display = "block";
                        const buttonRestart = document.getElementById('reset');
                        buttonRestart.addEventListener("click", ()=>{
                            palabraAdivinada = 0;
                            time.segundos = 0;
                            time.minutos = 0;
                            resetGame();
                        });
                    }
                    //Si tienes vidas
                    const titleLose = document.querySelector(".title-lose");
                    const buttonRestart = document.getElementById('reset');
                    const buttonContinue = document.getElementById("continue");

                    loseAlert.style.display = "block";
                    buttonRestart.addEventListener("click", ()=>{
                        const p = document.querySelector(".numAdivinadas");
                        p.innerHTML = ``;
                        time.segundos = 0;
                        time.minutos = 0;
                        palabraAdivinada = 0;
                        numAcertadas = 0;
                        resetGame();
                    });
                    buttonContinue.addEventListener("click", continueGame);
                }
            }
        }

        // Si adivinas la palabra
        if (aciertos == palabraActual.length) {
            audioEfecto.play()
            numAcertadas++
            palabraAdivinada++
                if (palabraAdivinada == 3) {
                    nivelActual++;
                    const winAlert = document.getElementById('win');
                    win.style.display = "block";
                    const buttonAdvanceLevel = document.getElementById('nextLevel');
                    buttonAdvanceLevel.addEventListener("click", advanceLevel);
                }
                const winAlert = document.getElementById('win');
                win.style.display = "block";
                const buttonAdvanceLevel = document.getElementById('nextLevel');
                buttonAdvanceLevel.addEventListener("click", advanceLevel);
        }

        //Si estas en el ultimo nivel y adivinas la palabra
        if (palabraAdivinada == 3 && nivelActual == 3) {
            const winAlert = document.getElementById('win');
            stop();
            const titleWin = document.querySelector(".title-win");
            titleWin.innerHTML = "¡Ganhou o jogo!"
            timeTextWin.innerHTML = `Seu tempo foi de: ${time.minutos}m ${time.segundos}s `;
            igText.style.display = "block"
            const buttonAdvanceLevel = document.getElementById('nextLevel');
            buttonAdvanceLevel.style.margin = "1rem"
            buttonAdvanceLevel.innerHTML = "Jogar de novo";
            buttonAdvanceLevel.removeEventListener("click", advanceLevel);
            buttonAdvanceLevel.addEventListener("click", ()=>{
                palabraAdivinada = 0;
                numAcertadas = 0;
                time.segundos = 0;
                time.minutos = 0;
                win.style.display = "none";
                const titleWin = document.querySelector(".title-win");
                titleWin.innerHTML = "¡Você adivinhou!"
                timeTextWin.innerHTML = ``;
                const buttonAdvanceLevel = document.getElementById('nextLevel');
                buttonAdvanceLevel.innerHTML = "Próxima palavra!";
                resetGame();
            });
            win.style.display = "block";
        }
    
        let palabraMostrar = palabraInArray.join(" ");
    
        // Muestra la tecla que presiono en la pantalla
        word.innerHTML = palabraMostrar;
        
        setTimeout(function () {
            funcionEnEjecucion = false;
        }, 400);
    }
}

// --Funcion de comenzar el juego--
function startGame() {
    divSound.style.display = "flex";
    aciertos = 0;
    imgIndice = 1;
    let palabra = "";
    // Poner la palabra aleatoria en _
    for (let i = 0; i < palabraActual.length; i++) {
        const element = palabraActual[i];
        if (element !== " ") {
            palabra += " _";
        }
    }
    // Mostrar la palabra aleatoria en la pantalla _
    word.innerHTML = palabra;

    // Dividir la palabra en letras
    palabraInArray = palabra.split(" ");

    // Agregar evento a cada letra
    for (const key of letters) {
        key.addEventListener("click", pressKey);
    }
    console.log(palabraActual)
}

// --Funcion de resetear el juego--
function resetGame(){
    console.log("reiniciaste")
    vidas = 3;
    containerHeart.children[0].style.visibility = "visible";
    containerHeart.children[1].style.visibility = "visible";
    containerHeart.children[2].style.visibility = "visible";
    nivelActual = 0;
    loseAlert.style.display = "none";
    for (const key of letters) {
        key.style.visibility = "visible";
        key.removeEventListener("click", pressKey);
    }
    const titleLose = document.querySelector(".title-lose");
    const buttonContinue = document.getElementById("continue");
    titleLose.innerHTML = "¡Você perdeu uma vida!"
    igText.style.display = "none"
    buttonContinue.style.display = "block"
    palabraActual = "";
    imgIndice = 1;
    img.style.backgroundImage = `url(./img/${imgIndice}.png)`;
    aciertos = 0;
    palabraInArray = [];
    wordRandom();
    startGame();
}

function continueGame(){
    loseAlert.style.display = "none";
    for (const key of letters) {
        key.style.visibility = "visible";
        key.removeEventListener("click", pressKey);
    }
    palabraActual = "";
    imgIndice = 1;
    img.style.backgroundImage = `url(./img/${imgIndice}.png)`;
    aciertos = 0;
    palabraInArray = [];
    time.segundos = 0;
    time.minutos = 0;
    wordRandom();
    startGame();
}

function advanceLevel(){
    win.style.display = "none";
    for (const key of letters) {
        key.style.visibility = "visible";
        key.removeEventListener("click", pressKey);
    }
    palabraActual = "";
    imgIndice = 1;
    img.style.backgroundImage = `url(./img/${imgIndice}.png)`;
    aciertos = 0;
    palabraInArray = [];
    if (palabraAdivinada == 3) {
        palabraAdivinada = 0;
    }
    wordRandom();
    startGame();
}

//para mutear el sonido de fondo
function muted(){
	iconFondo.classList.toggle("activado")
	if (iconFondo.classList.contains("activado")) {
        iconFondo.src = "icon/volume-high-solid.svg"
		audioFondo.play();
	} else {
        iconFondo.src = "icon/volume-xmark-solid.svg"
		audioFondo.pause();
	}
}

iconFondo.addEventListener("click",muted)

wordRandom();
startGame();
