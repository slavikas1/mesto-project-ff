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

const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
      closeModal(popup);
  }
  };
  
  export const openModal = (modal) => {
  // добавить класс открытия попапа
  modal.classList.add('.popup_is-opened');
  // добавить слушатель на кнопку Escape
  document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(popup);
  }
  })
  };
  
  export const closeModal = (modal) => {
  // удалить класс открытия попапа
  modal.classList.remove('.popup_is-opened');
  // удалить слушатель на кнопку Escape
  document.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(popup);
    }
    })
    };

  
  
  export const addListener = (элементПопапа) => {
  // ищем кнопку крестик в попапе
  const cross = document.querySelector('.popup__close');
  cross.addEventListener("click", () => {
      // closeModal(...)
      closeModal(cross);
  });
  
  элементПопапа.addEventListener("mousedown", (event) => {
      // если event.target содержит класс "popup", то закрываем
  });
  }
  
  
  const попапРедактированияПрофия = document.querySelector('...')
  const попапДобавленияКарточки = document.querySelector('...')
  const попапКартинки = document.querySelector('...')
  
  функцияЧтобыПовеситьСлушатели(попапРедактированияПрофия)
  функцияЧтобыПовеситьСлушатели(попапДобавленияКарточки)
  функцияЧтобыПовеситьСлушатели(попапКартинки)