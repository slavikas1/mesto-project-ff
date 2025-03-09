import { config, deleteCardFromServer } from "./api.js";
export function createCard(cardValue, deleteCard, likeCard, openImagePopup, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDelButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  cardImage.alt = cardValue.name;
  cardImage.src = cardValue.link;
  cardTitle.textContent = cardValue.name;

  cardLikeCount.textContent = cardValue.likes.length;

  if (cardValue.owner._id !== userId) {
    cardDelButton.style.display = 'none';
  }

  if (cardValue.likes.some(like => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardDelButton.addEventListener("click", () => deleteCard(cardElement, cardValue._id));
  cardLikeButton.addEventListener("click", () => likeCard(cardValue._id, cardLikeButton, cardLikeCount));
  cardImage.addEventListener("click", () =>
    openImagePopup(cardValue.link, cardValue.name)
  );

  return cardElement;
};

export function deleteCard(cardElement, cardId) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

export function likeCard(cardId, likeButton, likeCountElement) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const method = isLiked ? 'DELETE' : 'PUT';

  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((updatedCard) => {
      likeCountElement.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
};

