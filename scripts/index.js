// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardValue) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDelButton = cardElement.querySelector(".card__delete-button");
  cardImage.atl = cardValue.name;
  cardImage.src = cardValue.link;
  cardTitle.textContent = cardValue.name;
  cardDelButton.addEventListener("click", () => deleteCard(cardElement));
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(item) {
  item.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((cardValue) => {
  placesList.append(createCard(cardValue));
});
