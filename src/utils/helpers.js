export function renderLoading(isLoading, button, loadingText, defaultText) {
  button.textContent = isLoading ? loadingText : defaultText;
}
