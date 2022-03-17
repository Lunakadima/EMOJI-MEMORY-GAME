"use strict";

const emojiCards = ["👩‍💻", "👻", "🔑", "🤌🏼", "🎵", "🍕", "🦜"];

function getRandomEmojiCards() {
  const newArray = [];
  //Generamos un newArray con las parejas de emojis
  for (let i = 0; i < emojiCards.length; i++) {
    newArray.push(emojiCards[i]);
    newArray.push(emojiCards[i]);
  }
  //Por último lo ordenamos el newArray
  //de forma aleatoria y lo devolvemos
  return newArray.sort(() => 0.5 - Math.random);
}

export { getRandomEmojiCards };
