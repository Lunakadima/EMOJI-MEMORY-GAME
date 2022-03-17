"use strict";
import { getRandomEmojiCards } from "./cards.js";
import {
  mapCards,
  addNoCheckedId,
  clearMemory,
  saveNewGame,
  State,
} from "./state.js";

var score = 0;
var tries = 0;
const flippedCardIds = [];
var cards;
function flipElement(element) {
  element.classList.toggle("flipped");
}
function drawEmojisNSetId(emoji, Id, Flip) {
  for (const card of document.querySelectorAll(".card")) {
    const back = card.querySelector(".back");
    card.attributes.setAttribute("cardID", Id);
    back.textContent = emoji;
    if (Flip) {
      flipElement(card);
    }
  }
}
function renderBoard() {
  //Si ya había una partida iniciada
  if (State.GameInProgress) {
    //Cargamos la distribución de las cartas y
    //si había una carta que quedo sin verificar
    const cards = State.CardsDistribution;
    if (State.NoCheckedCardId) {
      flippedCardIds[0] = State.NoCheckedCardId;
    }
    for (const card of cards) {
      drawEmojisNSetId(card.Emoji, card.Id, card.Flipped);
    }
  } else {
    //Generamos las cartas de forma aleatoria y añadimos Id
    const cards = getRandomEmojiCards();
    let CounterID = 0;
    for (const card of cards) {
      drawEmojisNSetId(card.Emoji, ++CounterID, false);
    }
  }
}
const clickCard = (e) => {
  const selectedCard = e.currentTarget;

  flipElement(selectedCard);
};
function startNewGame() {
  cards = document.querySelectorAll(".card");
  cards.forEach((element) => {
    element.addEventListener("click", clickCard);
  });
}

startNewGame();
const board = document.querySelector(".board");
