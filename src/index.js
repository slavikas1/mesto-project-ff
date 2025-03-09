import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  closeModal,
  openModal,
  addCloseModalListener
} from "./components/modal.js";
import {
  formValidationConfig,
  enableValidation,
  clearValidation
} from "./components/validation.js";
import {
  addNewCard,
  updateAvatar,
  updateUserInfo,
  getInitialCards,
  getUserInfo,
} from "./components/api.js";
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewPlace = document.forms["new-place"];
const formEditAvatar = document.forms["edit-avatar"];
const avatarInput = formEditAvatar.elements.avatar;
const placeInput = formNewPlace.elements["place-name"];
const linkInput = formNewPlace.elements.link;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const placesList = document.querySelector(".places__list");
let userId;

function openImagePopup(imageSrc, imageAlt) {
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  openModal(imagePopup);
}

buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
  clearValidation(formEditProfile, formValidationConfig);
});

buttonAddCard.addEventListener("click", () => {
  openModal(newCardPopup);
  formNewPlace.reset();
  clearValidation(formNewPlace, formValidationConfig);
});

profileImage.addEventListener("click", () => openModal(editAvatarPopup));

addCloseModalListener(newCardPopup);
addCloseModalListener(editPopup);
addCloseModalListener(imagePopup);
addCloseModalListener(editAvatarPopup);

function handleProfileFormSubmit(e) {
  e.preventDefault();
  const submitButton = formEditProfile.querySelector(".popup__button");
  const originalButtonText = submitButton.textContent; // Сохраняем исходный текст кнопки

  submitButton.textContent = "Сохранение..."; // Меняем текст кнопки

  const newName = nameInput.value;
  const newAbout = jobInput.value;

  updateUserInfo(newName, newAbout)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText; // Возвращаем исходный текст кнопки
    });
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

function addNewFormSubmit(e) {
  e.preventDefault();
  const submitButton = formNewPlace.querySelector(".popup__button");
  const originalButtonText = submitButton.textContent; // Сохраняем исходный текст кнопки

  submitButton.textContent = "Сохранение..."; // Меняем текст кнопки

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  addNewCard(placeValue, linkValue)
    .then((cardData) => {
      console.log(userId);
      const cardElement = createCard(
        cardData,
        deleteCard,
        likeCard,
        openImagePopup,
        userId
      );
      placesList.prepend(cardElement);
      closeModal(newCardPopup);
      formNewPlace.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText; // Возвращаем исходный текст кнопки
    });
}

const hideDeleteButton = (cardOwnerId, userId, cardDelButton) => {
  if (cardOwnerId !== userId) {
    cardDelButton.style.display = "none";
  }
};

formNewPlace.addEventListener("submit", addNewFormSubmit);

function handleEditAvatarFormSubmit(e) {
  e.preventDefault();
  const submitButton = formEditAvatar.querySelector(".popup__button");
  const originalButtonText = submitButton.textContent; // Сохраняем исходный текст кнопки

  submitButton.textContent = "Сохранение..."; // Меняем текст кнопки

  const newAvatarUrl = avatarInput.value;

  updateAvatar(newAvatarUrl)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(editAvatarPopup);
      formEditAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText; // Возвращаем исходный текст кнопки
    });
}

formEditAvatar.addEventListener("submit", handleEditAvatarFormSubmit);

enableValidation(formValidationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((card) => {
      const cardElement = createCard(
        card,
        deleteCard,
        likeCard,
        openImagePopup,
        userId
      );
      const deleteButton = cardElement.querySelector(".card__delete-button");
      placesList.append(cardElement);
      hideDeleteButton(card.owner._id, userId, deleteButton);
    });
  })
  .catch((err) => {
    console.log(err);
  });
