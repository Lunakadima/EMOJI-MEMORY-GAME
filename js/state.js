/**
 * ####################
 * ##  LocalStorage  ##
 * ####################
 *
 * Obtendremos los datos de una partida en curso sin finalizar
 *
 */
const localStorageGameInProgress =
  window.localStorage.getItem("gameInProgress");
const localStorageCards = window.localStorage.getItem(
  "currentCardsDistribution"
);
const localStorageNoCheckedCardId =
  window.localStorage.getItem("noCheckedCardId");
const localStorageScore = window.localStorage.getItem("currentScore");
const localStorageTries = window.localStorage.getItem("currentTries");
const localStoragePlayer = window.localStorage.getItem("currentPlayer");

export const State = {
  GameInProgress: localStorageGameInProgress
    ? JSON.parse(localStorageGameInProgress)
    : false,
  NoCheckedCardId: localStorageNoCheckedCardId
    ? JSON.parse(localStorageNoCheckedCardId)
    : null,
  CardsDistribution: localStorageCards ? JSON.parse(localStorageCards) : [],
  Score: localStorageScore ? JSON.parse(localStorageScore) : 0,
  Tries: localStorageTries ? JSON.parse(localStorageTries) : 0,
  Player: localStoragePlayer ? JSON.parse(localStoragePlayer) : "",
};

const mapCards = (currentBoardDistribution) => {
  State.CardsDistribution = currentBoardDistribution;
};
const addNoCheckedId = (id) => {
  State.NoCheckedCardId = id;
};
const setGameInProgress = () => {
  State.GameInProgress = true;
};
//Limpiamos los datos y guardamos el juego
const clearData = () => {
  State.Score = 0;
  State.GameInProgress = false;
  State.Tries = 0;
  State.NoCheckedCardId = null;
  State.CardsDistribution = [];
  State.Player = "";
  saveGame();
};
//Incrementamos los intentos
const addTry = () => {
  State.Tries++;
};
//Incrementamos el numero de parejas encontradas
const addScore = () => {
  State.Score++;
};
//Guardamos el nombre del jugador
const addPlayer = (playerName) => {
  State.Player = playerName.toUpperCase();
};

//Guardamos en LS todos los cambios
const saveGame = () => {
  window.localStorage.setItem(
    "gameInProgress",
    JSON.stringify(State.GameInProgress)
  );
  window.localStorage.setItem(
    "noCheckedCardId",
    JSON.stringify(State.NoCheckedCardId)
  );
  window.localStorage.setItem(
    "currentCardsDistribution",
    JSON.stringify(State.CardsDistribution)
  );
  window.localStorage.setItem("currentScore", JSON.stringify(State.Score));
  window.localStorage.setItem("currentTries", JSON.stringify(State.Tries));
  window.localStorage.setItem("currentPlayer", JSON.stringify(State.Player));
};

export {
  mapCards,
  addNoCheckedId,
  setGameInProgress,
  clearData,
  saveGame,
  addTry,
  addScore,
  addPlayer,
};
