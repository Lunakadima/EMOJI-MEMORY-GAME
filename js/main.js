"use strict";
import { renderBoard } from "./cards.js";
import { State, addPlayer, clearData, saveGame } from "./state.js";

const start = document.querySelector(".start");
const board = document.querySelector(".board");
const end = document.querySelector(".end");
const scorePanel = document.querySelector("footer");
const inputName = document.querySelector("input");
const startBtn = start.querySelector("button");
const endButton = end.querySelector("button");

startBtn.addEventListener("click", (e) => {
  if (inputName.value === "") {
    alert("Introduce tu nombre para empezar");
    return;
  }
  if (inputName.value.length > 10) {
    alert("El nombre no puede exceder los 10 caracteres");
    inputName.value = "";
    return;
  }
  addPlayer(inputName.value);
  // ocultar todos los paneles
  hideAllPanel();
  // llamo funcion que visualiza panel central
  renderBoard();
  showPanel(board);
  showPanel(scorePanel);
});

endButton.addEventListener("click", (e) => {
  //Ocultamos los paneles y mostramos el marcador final
  hideAllPanel();
  inputName.value = "";
  showPanel(start);
});
//Funcion que muestra cualquier elemento del html
function showPanel(panel) {
  panel.classList.remove("hidden");
}
//Función que oculta todos las section panel del html
function hideAllPanel() {
  start.classList.add("hidden");
  board.classList.add("hidden");
  end.classList.add("hidden");
  scorePanel.classList.add("hidden");
}

//Función principal
function main() {
  hideAllPanel();
  //Si ya había una partida en curso...
  if (!State.GameInProgress) {
    showPanel(start);
  } else {
    renderBoard();
    showPanel(board);
    showPanel(scorePanel);
  }
}
//Función para indicar que la partida acabo
function gameFinished(tries) {
  //Ocultamos los paneles y mostramos el marcador final
  hideAllPanel();
  const labelTries = end.querySelector("p");
  labelTries.textContent = "Intentos totales: " + tries;
  showPanel(end);
}

// State.GameInProgress = false;
main();
export { gameFinished };
