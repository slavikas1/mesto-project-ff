export function createCard(cardValue, deleteCard, likeCard, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDelButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.alt = cardValue.name;
  cardImage.src = cardValue.link;
  cardTitle.textContent = cardValue.name;

  cardDelButton.addEventListener("click", () => deleteCard(cardElement));
  cardLikeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", () =>
    openImagePopup(cardValue.link, cardValue.name)
  );

  return cardElement;
}

export function deleteCard(item) {
  item.remove();
}

export function likeCard(e) {
  e.target.classList.toggle("card__like-button_is-active");
}
