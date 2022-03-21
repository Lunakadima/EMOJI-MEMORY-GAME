"use strict";
import {
  State,
  mapCards,
  addNoCheckedId,
  setGameInProgress,
  clearData,
  saveGame,
  addTry,
  addScore,
} from "./state.js";
import { gameFinished } from "./main.js";

let score = 0;
let tries = 0;
const emojiCards = ["🎮", "🛸", "📼", "🛹", "🛼", "🤖", "📟", "🕹"];
const flippedCardIds = [];
const board = document.querySelector(".board");
const cards = board.querySelectorAll(".card");
const labelPlayer = document.querySelector(".player");
const labelTries = document.querySelector(".tries");

//Función que duplica el contenido de un array
function duplicate(array) {
  const copyArray = [];
  for (let i = 0; i < array.length; i++) {
    copyArray.push(array[i]);
    copyArray.push(array[i]);
  }
  return copyArray;
}
//Funcion que genera parejas de emojis
//y los ordena en un array de forma aleatoria
function getRandomEmojiCards() {
  return duplicate(emojiCards).sort(() => 0.5 - Math.random());
}
//Función que dibuja un emoji en el reverso de una carta
function drawEmojis(card, emoji, Flip) {
  const back = card.querySelector(".back");
  back.textContent = emoji;
  if (Flip) {
    flipElement(card);
  }
}
//Función que voltea un elemento
function flipElement(element) {
  element.classList.toggle("flipped");
}
//Función que dibuja el tablero de cartas
function renderBoard() {
  //Creamos un contador auxiliar para recorrer el array de emojis
  let cardCounter = 0;
  const savedCards = State.CardsDistribution;
  const emojis = getRandomEmojiCards();

  //Si había partida y quedo una sola carta volteada, recogemos su id
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
      State.GameInProgress ? savedCards[cardCounter].Flipped : isFlipped(card)
    );
    cardCounter++;
  }
  //Recuperamos los marcadores
  score = State.Score;
  tries = State.Tries;
  labelPlayer.textContent = "Player: " + State.Player;
  labelTries.textContent = "Intentos: " + State.Tries;
  //Marcamos la partida como iniciada
  setGameInProgress();
}
//Función que gestiona la lógica del volteo de las cartas
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
    addTry();
    if (getCardById(id1).textContent === getCardById(id2).textContent) {
      score++;
      addScore();
      console.log("Las cartas son iguales", score, "/", tries);
    } else {
      console.log("Las cartas son diferentes", score, "/", tries);

      setTimeout(() => {
        flipElement(getCardById(id1));
      }, 1000);
      setTimeout(() => {
        flipElement(getCardById(id2));
      }, 1000);
    }
    flippedCardIds.pop();
    flippedCardIds.pop();
    labelTries.textContent = "Intentos: " + State.Tries;

    if (score === 8) {
      console.log("Enhorabuena, has ganado!");
      clearData();
      setTimeout(() => {
        gameFinished(tries);
      }, 1000);
    }
  }
};
//Función que verifica si la carta ya había seleccionada
function alreadySelectedCard(id) {
  return [...board.querySelectorAll(".flipped")].some((c) => {
    return c.getAttribute("id") === id;
  });
}
//Función que devuelve una carta dado su id
function getCardById(id) {
  return [...cards].find((c) => {
    return c.getAttribute("id") == id;
  });
}
//Función que indica si un elemento estaba volteado o no
function isFlipped(element) {
  return [...element.classList].some((c) => {
    return c === "flipped";
  });
}
//Antes de cerrar la ventana guardamos los datos necesarios en el
//local storage
window.addEventListener("beforeunload", () => {
  //Si solo se volteo una carta y esta pendiente de verificar....
  flippedCardIds[0] ? addNoCheckedId(flippedCardIds[0]) : addNoCheckedId(null);
  const cardsForMap = [];
  //Mapeamos los emojis y si la carta estaba volteada
  for (const card of cards) {
    cardsForMap.push({ Emoji: card.innerText, Flipped: isFlipped(card) });
  }
  mapCards(cardsForMap);
  //Guardamos la partida
  saveGame();
});

cards.forEach((element) => {
  element.addEventListener("click", clickCard);
});
export { renderBoard };
