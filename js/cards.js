"use strict";

const emojiCards = ["👩‍💻", "👻", "🙈", "🔑", "🤌🏼", "🎵", "🍕", "🦜"];

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

export { getRandomEmojiCards };
