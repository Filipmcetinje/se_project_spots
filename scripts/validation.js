const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(config.inputErrorClass);
  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add(config.errorClass);
};
const hideInputError = (formElement, inputElement, config) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(config.inputErrorClass);
  errorMessageElement.classList.remove(config.errorClass);
  errorMessageElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
    return false;
  } else {
    hideInputError(formElement, inputElement, config);
    return true;
  }
};

const toggleButtonState = (formElement, inputList, buttonElement, config) => {
  const isFormValid = inputList.every((input) => input.validity.valid);
  if (isFormValid) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  }
};

const resetValidation = (formElement, inputList, config) => {
  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
  });
};

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(formElement, inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, inputList, buttonElement, config);
    });
  });
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();

    formElement.reset();
    toggleButtonState(formElement, inputList, buttonElement, config);
    closeModal(formElement.closest(".modal"));
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(settings);
