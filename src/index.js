import "../pages/index.css";
import "./cards.js";
import initialCards from "./cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  closeModal,
  openModal,
  addCloseModalListener,
} from "./components/modal.js";
const placesList = document.querySelector(".places__list");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const formNewPlace = document.forms["new-place"];
const placeInput = formNewPlace.elements["place-name"];
const linkInput = formNewPlace.elements.link;

function openImagePopup(imageSrc, imageAlt) {
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  openModal(imagePopup);
}

initialCards.forEach((cardValue) => {
  placesList.append(
    createCard(cardValue, deleteCard, likeCard, openImagePopup)
  );
});

buttonEditProfile.addEventListener("click", () => {
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
});

buttonAddCard.addEventListener("click", () => openModal(newCardPopup));

addCloseModalListener(newCardPopup);
addCloseModalListener(editPopup);
addCloseModalListener(imagePopup);

function handleFormSubmit(e) {
  e.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
  closeModal(editPopup);
}

formElement.addEventListener("submit", handleFormSubmit);

function addNewFormSubmit(e) {
  e.preventDefault();
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  const newCardData = {
    name: placeValue,
    link: linkValue,
  };
  placesList.prepend(
    createCard(newCardData, deleteCard, likeCard, openImagePopup)
  );
  closeModal(newCardPopup);
  formNewPlace.reset();
}

formNewPlace.addEventListener("submit", addNewFormSubmit);
