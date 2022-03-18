"use strict";
import { getRandomEmojiCards } from "./cards.js";
import {
  mapCards,
  addNoCheckedId,
  clearMemory,
  saveNewGame,
  State,
} from "./state.js";

let score = 0;
let tries = 0;
const flippedCardIds = [];
let someCardFlipped = false;

const board = document.querySelector(".board");
const start = document.querySelector(".start");
const cards = board.querySelectorAll(".card");

function alreadySelectedCard(id) {
  return [...board.querySelectorAll(".flipped")].some((c) => {
    return c.getAttribute("id") === id;
  });
}
function flipElement(element) {
  element.classList.toggle("flipped");
}
function drawEmojis(card, emoji, Flip) {
  const back = card.querySelector(".back");
  back.textContent = emoji;
  if (Flip) {
    flipElement(card);
  }
}
function renderBoard() {
  //Creamos un contador para recorrer el array de emojis
  let cardCounter = 0;
  const savedCards = State.CardsDistribution;
  const emojis = getRandomEmojiCards();

  if (State.GameInProgress && State.NoCheckedCardId) {
    flippedCardIds[0] = State.NoCheckedCardId;
  }
  //Recorremos el tablero y añadimos la distribucion guardada
  for (const card of board.querySelectorAll(".card")) {
    drawEmojis(
      card,
      State.GameInProgress
        ? savedCards[cardCounter].Emoji
        : emojis[cardCounter],
      State.GameInProgress ? savedCards[cardCounter].Flipped : false
    );
    cardCounter++;
  }
}
const clickCard = (e) => {
  const selectedCard = e.currentTarget;

  flipElement(selectedCard);
  someCardFlipped = true;
};
function startNewGame() {
  renderBoard();
}
window.addEventListener("beforeunload", () => {
  const arrayFlip = [];
  for (const card of board.querySelectorAll(".card")) {
    arrayFlip.push(
      [...card.classList].some((c) => {
        return c === "flipped";
      })
    );
  }
});
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
      showBoard();
    });
  } else {
    startNewGame();
  }
}

cards.forEach((element) => {
  element.addEventListener("click", clickCard);
});
main();
