import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { renderLoading } from "../utils/helpers.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6bc063f4-97b0-4b93-9bdf-3503c55e6067",
    "Content-Type": "application/json",
  },
});

const profileEditButton = document.querySelector(".profile__edit-button");
const cardModalButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-btn");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

const profileFormElement = document.forms["edit-profile"];
const editModal = document.querySelector("#edit-modal");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = document.forms["edit-avatar"];
const avatarInput = avatarForm.elements.avatar;

//const editModalCloseButton = editModal.querySelector(".modal__close-button");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = document.forms["confirm-delete"];

const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const captionInput = cardModal.querySelector("#add-card-caption-input");
const linkInput = cardModal.querySelector("#add-card-link-input");

//const cardModalCloseButton = cardModal.querySelector(".modal__close-button");

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
//const previewModalCloseButton = previewModal.querySelector(
// ".modal__close-button"
//);

let selectedCard;
let selectedCardId;

api
  .getAppInfo()
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// {name: cardNameValue, link: cardLinkValue}
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  // cardLikeButton.addEventListener("click", () => {
  //   cardLikeButton.classList.toggle("card__like-button_liked");
  // });
  cardImage.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
  });
  cardDeleteButton.addEventListener("click", () =>
    handleDeleteCard(cardElement, data)
  );
  cardLikeButton.addEventListener("click", () =>
    handleLike(cardLikeButton, data._id)
  );
  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  }
  return cardElement;
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

// const modals = document.querySelectorAll(".modal");
// modals.forEach((modal) => {
//   modal.addEventListener("click", (evt) => {
//     if (evt.target.classList.contains("modal")) {
//       closeModal(modal);
//     }
//   });
// });

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.closest(".modal__close-button")
    ) {
      closeModal(modal);
    }
  });
});

const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const activePopap = document.querySelector(".modal_opened");
    closeModal(activePopap);
  }
};

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button, "Saving...", "Save");

  button.textContent = "Saving...";
  // profileName.textContent = editModalNameInput.value;
  // profileDescription.textContent = editModalDescriptionInput.value;
  const data = {
    name: editModalNameInput.value,
    about: editModalDescriptionInput.value,
  };
  api
    .updateUserInfo(data)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editModal);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(false, button, "Saving...", "Save");
    });
}

//console.log(cardsList)
//console.log(linkInput, captionInput.value)
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button, "Saving...", "Save");
  // const values = { name: captionInput.value, link: linkInput.value };
  // const cardElement = getCardElement(values);
  const data = {
    name: captionInput.value,
    link: linkInput.value,
  };
  api
    .addCard(data)
    .then((newCard) => {
      const cardElement = getCardElement(newCard);
      cardsList.prepend(cardElement);
      closeModal(cardModal);
      evt.target.reset();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(false, button, "Saving...", "Save");
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button, "Saving...", "Save");
  const avatar = { avatar: avatarInput.value };

  api
    .updateAvatar(avatar)
    .then((userData) => {
      profileAvatar.src = userData.avatar;
      closeModal(avatarModal);
      evt.target.reset();
    })
    .catch((error) => console.error(error))
    .finally(() => {
      renderLoading(false, button, "Saving", "Save");
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button, "Deleting...", "Delete");

  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
      selectedCard = null;
      selectedCardId = null;
    })
    .catch((error) => console.error(error))
    .finally(() => {
      renderLoading(false, button, "Deleting...", "Delete");
    });
}

function handleLike(cardLikeButton, cardId) {
  const isLiked = cardLikeButton.classList.contains("card__like-button_liked");

  const likeAction = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);

  likeAction
    .then((updatedCard) => {
      cardLikeButton.classList.toggle("card__like-button_liked");
    })
    .catch((error) => console.error(error));
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  const inputList = [editModalNameInput, editModalDescriptionInput];
  resetValidation(profileFormElement, inputList, settings);
  openModal(editModal);
});

const deleteCancelButton = document.querySelector(".modal__cancel-button");

deleteCancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
});

// const closeButtons = document.querySelectorAll(".modal__close-button");

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");

//   button.addEventListener("click", () => closeModal(modal));
// });

//editModalCloseButton.addEventListener("click", () => {
// closeModal(editModal);
//});

cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});

avatarEditButton.addEventListener("click", () => {
  openModal(avatarModal);
});

//cardModalCloseButton.addEventListener("click", () => {
// closeModal(cardModal);
//});
//previewModalCloseButton.addEventListener("click", () => {
// closeModal(previewModal);
//});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

// initialCards.forEach((item) => {
//   const cardElement = getCardElement(item);
//   cardsList.prepend(cardElement);
// });

enableValidation(settings);
