"use strict";
import { renderBoard, tries } from "./cards.js";
import { State } from "./state.js";

const start = document.querySelector(".start");
const board = document.querySelector(".board");
const end = document.querySelector(".end");
const scorePanel = document.querySelector("footer");

function showPanel(panel) {
  panel.classList.remove("hidden");
}
function hideAllPanel() {
  start.classList.add("hidden");
  board.classList.add("hidden");
}
function main() {
  if (!State.GameInProgress) {
    showPanel(start);
    const startBtn = start.querySelector("button");
    startBtn.addEventListener("click", (e) => {
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
    renderBoard();
  }
}
function gameFinished() {
  hideAllPanel();
  showPanel(end);
}

main();

export { gameFinished };
