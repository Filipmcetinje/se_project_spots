const initialCards = [
  {
    name: "Val Thorens",
    link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcute-dog&psig=AOvVaw3ZNE-JXNQdlTW-eTd2powG&ust=1736647490248000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCvoZnK7IoDFQAAAAAdAAAAABAE",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
const profileEditButton = document.querySelector(".profile__edit-button");

const editModal = document.querySelector("#edit-modal");

const modalCloseButton = editModal.querySelector(".modal__close-button");

function openModal() {
  editModal.classList.add("modal_opened");
}
function closeModal() {
  editModal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", openModal);

modalCloseButton.addEventListener("click", closeModal);
