"use strict";
import {
  mapCards,
  addNoCheckedId,
  clearMemory,
  saveNewGame,
  State,
} from "./state.js";

export let score = 0;
export let tries = 0;
const emojiCards = ["👩‍💻", "👻", "🙈", "🔑", "🤌🏼", "🎵", "🍕", "🦜"];
const flippedCardIds = [];
const board = document.querySelector(".board");
const cards = board.querySelectorAll(".card");

function duplicate(array) {
  const copyArray = [];
  for (let i = 0; i < array.length; i++) {
    copyArray.push(array[i]);
    copyArray.push(array[i]);
  }
  return copyArray;
}
function getRandomEmojiCards() {
  //Por último lo ordenamos el newArray
  //de forma aleatoria y lo devolvemos
  return duplicate(emojiCards).sort(() => 0.5 - Math.random());
}
function drawEmojis(card, emoji, Flip) {
  const back = card.querySelector(".back");
  back.textContent = emoji;
  if (Flip) {
    flipElement(card);
  }
}
function flipElement(element) {
  element.classList.toggle("flipped");
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
  let id = selectedCard.getAttribute("id");
  if (alreadySelectedCard(id)) {
    console.log("Ya se había volteado esa carta");
    return;
  }
  //Añadimos el id al array de ids
  flippedCardIds.push(id);
  flipElement(selectedCard);

  //Si se han volteado dos cartas...
  if (flippedCardIds.length === 2) {
    let id1 = flippedCardIds[0];
    let id2 = flippedCardIds[1];
    console.log("Se han voletado dos cartas...");
    tries++;

    if (getCardById(id1).textContent === getCardById(id2).textContent) {
    } else {
      setTimeout(() => {
        flipElement(getCardById(id1));
      }, 1000);
      setTimeout(() => {
        flipElement(getCardById(id2));
      }, 1000);
    }
    flippedCardIds.pop();
    flippedCardIds.pop();
  }
};
function alreadySelectedCard(id) {
  return [...board.querySelectorAll(".flipped")].some((c) => {
    return c.getAttribute("id") === id;
  });
}
function getCardById(id) {
  return [...cards].find((c) => {
    return c.getAttribute("id") == id;
  });
}
cards.forEach((element) => {
  element.addEventListener("click", clickCard);
});
export { renderBoard };
