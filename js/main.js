"use strict";
import { renderBoard } from "./cards.js";
import {
  mapCards,
  addNoCheckedId,
  clearMemory,
  saveNewGame,
  State,
} from "./state.js";

const start = document.querySelector(".start");
const board = document.querySelector(".board");
const scorePanel = document.querySelector("footer");
window.addEventListener("beforeunload", () => {});
function showPanel(panel) {
  panel.classList.remove("hidden");
}
function showBoard() {
  showPanel(board);
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
    renderBoard();
  }
}

main();
