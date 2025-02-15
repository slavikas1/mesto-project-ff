export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
}
export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
}
export const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};
export function addCloseModalListener(modal) {
  const cross = modal.querySelector(".popup__close");
  cross.addEventListener("click", () => {
    closeModal(modal);
  });

  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("popup")) {
      closeModal(modal);
    }
  });
}
