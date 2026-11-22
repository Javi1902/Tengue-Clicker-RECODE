// Variables
let puntajeMultiplier = 1;
let puntajeReal = 0;
let prestige = 0;
let rebirthCounter = 0;
let precioNoliAjustable = 1;

// Elementos DOM
let puntajeDisplay = document.getElementById("puntajeDisplay");
let puntajeMultiplierDisp = document.getElementById("multiplierDisplay");
let prestigeDisplay = document.getElementById("prestigeDisplay");
let btn = document.getElementById("btn");
let prestigeForRebirthDisplay = document.getElementById("prestigeRebirth");
let rebirthCounterDisplay = document.getElementById("rebirthDisplay");
let closeMenuBtn = document.getElementById("closeMenuBtn");
let rebirthMenu = document.getElementById("rebirthMenu");
let guideMenu = document.getElementById("guideMenu");
let guideBtn = document.getElementById("guideBtn");
let guideClose = document.getElementById("guideClose");
let rebirthDisplayModal = document.getElementById("rebirthDisplayModal");
let mejoraNoliAjustableDisplay = document.getElementById(
  "mejoraNoliBalanceada",
);
let precioNoliAjustableDisplay = document.getElementById("precioNoliAjustable");
let prestigeForRebirth = 30;
let restaTenguePorTenguenario = 25;
let LIMITE_PRESTIGIO = 50;

// Botones
const prestigeBtn = document.getElementById("prestigeBtn");
const rebirthBtn = document.getElementById("rebirthBtn");
const shopBtn1 = document.getElementById("shopBtn1");

// Función de mejora inteligente basada en el progreso actual
function calcularBonusNoli() {
  return Math.max(20, Math.floor(puntajeMultiplier * 0.5) + prestige * 5);
}

displayMultiplier();
displayPrestige();
displayPrestigeRebirth();
displayMejoraNoliAjustable();
displayPrecioNoliAjustable();

// Displays
function displayMultiplier() {
  puntajeMultiplierDisp.innerHTML = Math.floor(puntajeMultiplier);
}

function displayTengues() {
  puntajeDisplay.innerHTML = Math.floor(puntajeReal);
}

function displayPrestige() {
  prestigeDisplay.innerHTML = Math.floor(prestige);
}

function displayPrestigeRebirth() {
  prestigeForRebirthDisplay.innerHTML = prestigeForRebirth;
}

function displayRebirthCounter() {
  rebirthCounterDisplay.innerHTML = rebirthCounter;
}

function displayRebirthCounterModal() {
  rebirthDisplayModal.innerHTML = rebirthCounter;
}

function displayMejoraNoliAjustable() {
  mejoraNoliAjustableDisplay.innerHTML = calcularBonusNoli();
}

function displayPrecioNoliAjustable() {
  precioNoliAjustableDisplay.innerHTML = precioNoliAjustable;
}

// 1. CLIC PRINCIPAL
btn.addEventListener("click", function () {
  puntajeReal += puntajeMultiplier;

  while (puntajeReal >= LIMITE_PRESTIGIO) {
    prestige += 1;
    puntajeReal -= restaTenguePorTenguenario;
    LIMITE_PRESTIGIO += 65;
  }

  displayMultiplier();
  displayPrestige();
  displayTengues();
  displayRebirthCounter();
  displayMejoraNoliAjustable();
});

// 2. CONVERTIR TENGUENARIOS
prestigeBtn.addEventListener("click", function () {
  if (prestige > 0) {
    puntajeMultiplier += prestige;
    restaTenguePorTenguenario = Math.max(10, restaTenguePorTenguenario - 5);
    prestige = 0;
    displayMultiplier();
    displayPrestige();
    displayTengues();
    displayRebirthCounter();
    displayMejoraNoliAjustable();
  } else {
    alert("¡No tienes tenguenarios para convertir!");
  }
});

// 3. ASCENDER (REBIRTH)
rebirthBtn.addEventListener("click", function () {
  if (prestige >= prestigeForRebirth) {
    puntajeMultiplier *= 2;
    prestige -= prestigeForRebirth;
    puntajeReal = 0;
    prestigeForRebirth = Math.floor(prestigeForRebirth * 1.5);
    restaTenguePorTenguenario += Math.floor(puntajeMultiplier * 1.2);
    rebirthCounter += 1;

    rebirthMenu.classList.remove("cerrando");
    rebirthMenu.showModal();
  } else {
    let faltantes = prestigeForRebirth - prestige;
    alert(`Te faltan ${faltantes} tenguenarios para poder ascender.`);
  }
  displayMultiplier();
  displayPrestige();
  displayTengues();
  displayPrestigeRebirth();
  displayRebirthCounter();
  displayRebirthCounterModal();
  displayMejoraNoliAjustable();
});

// TIENDA - UPGRADE INTELIGENTE
shopBtn1.addEventListener("click", function () {
  if (rebirthCounter >= precioNoliAjustable) {
    let bonusInteligente = calcularBonusNoli();
    puntajeMultiplier += bonusInteligente;

    rebirthCounter -= precioNoliAjustable;

    let incrementoPrecio = Math.max(1, Math.floor(rebirthCounter * 0.3) + 1);
    precioNoliAjustable += incrementoPrecio;

    displayMultiplier();
    displayMejoraNoliAjustable();
    displayRebirthCounterModal();
    displayPrecioNoliAjustable();
    displayRebirthCounter();
  } else {
    alert("¡No has ascendido suficientes veces!");
  }
});

// CERRAR MODAL DE TIENDA CON ANIMACIÓN
closeMenuBtn.addEventListener("click", function () {
  rebirthMenu.classList.add("cerrando");

  rebirthMenu.addEventListener("animationend", function handler(e) {
    if (e.animationName === "tiendaDesapareciendo") {
      rebirthMenu.close();
      rebirthMenu.classList.remove("cerrando");
      rebirthMenu.removeEventListener("animationend", handler);

      displayMultiplier();
      displayPrestige();
      displayPrestigeRebirth();
      displayRebirthCounter();
      displayMejoraNoliAjustable();
    }
  });
});

// ABRIR Y CERRAR MODAL DE GUÍA CON ANIMACIÓN
guideBtn.addEventListener("click", function () {
  guideMenu.classList.remove("cerrando");
  guideMenu.showModal();
});

guideClose.addEventListener("click", function () {
  guideMenu.classList.add("cerrando");

  guideMenu.addEventListener("animationend", function handler(e) {
    if (e.animationName === "tiendaDesapareciendo") {
      guideMenu.close();
      guideMenu.classList.remove("cerrando");
      guideMenu.removeEventListener("animationend", handler);
    }
  });
});

localStorage.setItem(
  "save",
  JSON.stringify({ puntajeMultiplier, prestige, rebirthCounter }),
);
