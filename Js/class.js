const formWrapper = document.querySelector(".formbold-form-wrapper");
const crossIcon = document.querySelector(".cross-icon");
const chatIcon = document.querySelector(".chat-icon");


function chatboxToogleHandler() {
  formWrapper.classList.toggle("hidden");
  crossIcon.classList.toggle("hidden");
  chatIcon.classList.toggle("hidden");
}
