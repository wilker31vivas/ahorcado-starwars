const buttonSpain = document.querySelector(".button-spain");
const buttonBrazil = document.querySelector(".button-brazil");
const buttonUsa = document.querySelector(".button-usa");
const openBtn = document.getElementById("openInstructions");
const closeBtn = document.getElementById("closeInstructions");
const modal = document.getElementById("instructionsModal");
const button = document.querySelector(".lobby__btn");

let currentLanguage = "es";
let translations = {};

//--Abrir instrucciones--
openBtn.addEventListener("click", () => (modal.style.display = "block"));
closeBtn.addEventListener("click", () => (modal.style.display = "none"));

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

function spain() {
  currentLanguage = "es";
  applyTranslations(currentLanguage);
}

function brazil() {
  currentLanguage = "pt";
  applyTranslations(currentLanguage);
}

function usa() {
  currentLanguage = "en";
  applyTranslations(currentLanguage);
}

function applyTranslations(lang) {
  if (lang) {
    document.querySelector(".lobby__btn").textContent =
      translations[lang].startButton;
    document.querySelector(".lobby__text").textContent =
      translations[lang].welcomeMessage;
    document.querySelector(".btn-instructions").textContent =
      translations[lang].instructionsTitle;
    button.href = `index-game.html?lang=${lang}`;
    document.querySelector(".container__title").textContent =
      translations[lang].instructionsTitle;
    document.querySelector(".instructions-text").innerHTML = `
    <p>${translations[lang].intro}</p>
    <h2>${translations[lang].objectiveTitle}</h2>
    <p>${translations[lang].objectiveText}</p>
    <h2>${translations[lang].howToTitle}</h2>
    <ul>
      ${translations[lang].howToList.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
  }
}

// Cargar JSON
async function loadTranslations() {
  try {
    const res = await fetch("../data/languages.json");
    translations = await res.json();
    applyTranslations(currentLanguage);
  } catch (err) {
    console.error("Error loading translations:", err);
  }
}

loadTranslations();

buttonSpain.addEventListener("click", spain);
buttonBrazil.addEventListener("click", brazil);
buttonUsa.addEventListener("click", usa);
