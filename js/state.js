const localStorageGameInProgress =
  window.localStorage.getItem("gameInProgress");
const localStorageCards = window.localStorage.getItem(
  "currentCardsDistribution"
);
const localStorageNoCheckedCardId =
  window.localStorage.getItem("noCheckedCardId");
const localStorageScore = window.localStorage.getItem("currentScore");
const localStorageTries = window.localStorage.getItem("currentTries");

export const State = {
  GameInProgress: localStorageGameInProgress
    ? JSON.parse(localStorageGameInProgress)
    : false,
  NoCheckedCardId: localStorageNoCheckedCardId
    ? JSON.parse(localStorageNoCheckedCardId)
    : null,
  CardsDistribution: localStorageCards ? JSON.parse(localStorageCards) : [],
};

const mapCards = (currentBoardDistribution) => {
  State.CardsDistribution = currentBoardDistribution;
};
const addNoCheckedId = (id) => {
  State.NoCheckedCardId = id;
};
const clearMemory = () => {
  State.GameInProgress = false;
};
const saveNewGame = () => {
  State.GameInProgress = true;
};

export { mapCards, addNoCheckedId, clearMemory, saveNewGame };
