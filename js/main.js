"use strict";
import { renderBoard } from "./cards.js";
import { State, addPlayer } from "./state.js";

const start = document.querySelector(".start");
const board = document.querySelector(".board");
const end = document.querySelector(".end");
const scorePanel = document.querySelector("footer");
const inputName = document.querySelector("input");

function showPanel(panel) {
  panel.classList.remove("hidden");
}
function hideAllPanel() {
  start.classList.add("hidden");
  board.classList.add("hidden");
  scorePanel.classList.add("hidden");
}

//Función principal
function main() {
  //Si ya había una partida en curso...
  if (!State.GameInProgress) {
    showPanel(start);
    const startBtn = start.querySelector("button");
    startBtn.addEventListener("click", (e) => {
      if (inputName.value === "") {
        alert("Introduce tu nombre para empezar");
        return;
      }
      addPlayer(inputName.value);
      // ocultar todos los paneles
      hideAllPanel();
      // llamo funcion que visualiza panel central
      showPanel(board);
      showPanel(scorePanel);
      renderBoard();
    });
  } else {
    hideAllPanel();
    showPanel(board);
    showPanel(scorePanel);
    renderBoard();
  }
}
//Función para indicar que la partida acabo
function gameFinished() {
  //Ocultamos los paneles y mostramos el marcador final
  hideAllPanel();
  end.querySelector("p").textContent = "Intentos totales: ";
  showPanel(end);
  const endBtn = end.querySelector("button");
  endBtn.addEventListener("click", (e) => {
    main();
  });
}

main();

export { gameFinished };
