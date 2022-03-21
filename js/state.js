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
const clearData = () => {
  State.GameInProgress = false;
  State.Score = 0;
  State.Tries = 0;
  State.NoCheckedCardId = null;
  State.CardsDistribution = [];
  State.Player = "";
};
const addTry = () => {
  State.Tries++;
};
const addScore = () => {
  State.Score++;
};
const addPlayer = (playerName) => {
  State.Player = playerName.toUpperCase();
};
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
