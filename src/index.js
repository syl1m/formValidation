/* eslint-disable no-use-before-define */
import "./style.css";

const form = document.querySelector("form");
const email = document.getElementById("email");
const country = document.getElementById("country");
const zipcode = document.getElementById("zipcode");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPass");
const popUpBtn = document.querySelector(".successfulSubmission button");

const emailError = document.querySelector("#email + span.error");
const countryError = document.querySelector("#country + span.error");
const zipcodeError = document.querySelector("#zipcode + span.error");
const passwordError = document.querySelector("#password + span.error");
const confirmPassError = document.querySelector("#confirmPass + span.error");

email.addEventListener("input", () => {
  if (email.validity.valid) {
    emailError.textContent = "";
    email.className = "error";
  } else {
    showEmailError();
  }
});

country.addEventListener("input", () => {
  if (country.validity.valid) {
    countryError.textContent = "";
    country.className = "error";
  } else {
    showCountryError();
  }
});

zipcode.addEventListener("input", () => {
  if (zipcode.validity.valid) {
    zipcodeError.textContent = "";
    zipcode.className = "error";
  } else {
    showZipcodeError();
  }
});

password.addEventListener("input", () => {
  if (password.validity.valid) {
    passwordError.textContent = "";
    password.className = "error";
  } else {
    showPasswordError();
  }

  if (confirmPassword.value === password.value) {
    confirmPassError.textContent = "";
    confirmPassword.className = "error";
  } else if (!confirmPassword.validity.valueMissing) {
    confirmPassError.textContent = "Passwords do not match";
    confirmPassword.className = "error active";
  }
});

confirmPassword.addEventListener("input", () => {
  if (
    confirmPassword.validity.valid &&
    confirmPassword.value === password.value
  ) {
    confirmPassError.textContent = "";
    confirmPassword.className = "error";
  } else {
    showConfirmPassError();
  }
});

popUpBtn.addEventListener("click", () => {
  document.querySelector(".successfulSubmission").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
});

// Error functions
function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "Missing email address";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Enter a valid email address";
  }
  email.className = "error active";
}

function showCountryError() {
  if (country.validity.valueMissing) {
    countryError.textContent = "Missing Country";
  }
  country.className = "error active";
}

function showZipcodeError() {
  if (zipcode.validity.valueMissing) {
    zipcodeError.textContent = "Missing Zip Code";
  } else if (zipcode.validity.patternMismatch) {
    zipcodeError.textContent = "Enter a valid Zip Code";
  }
  zipcode.className = "error active";
}

function showPasswordError() {
  if (password.validity.valueMissing) {
    passwordError.textContent = "Missing Password";
  } else if (password.validity.patternMismatch) {
    passwordError.textContent =
      "Password must be at least eight characters and contain at least one upper case letter, one lower case letter, one number and one special character";
  }
  password.className = "error active";
}

function showConfirmPassError() {
  if (confirmPassword.validity.valueMissing) {
    confirmPassError.textContent = "Missing Password Confirmation";
  } else if (!(confirmPassword.value === password.value)) {
    confirmPassError.textContent = "Passwords do not match";
  }
  confirmPassword.className = "error active";
}

form.addEventListener("submit", (e) => {
  if (!email.validity.valid) {
    showEmailError();
  }

  if (!country.validity.valid) {
    showCountryError();
  }

  if (!zipcode.validity.valid) {
    showZipcodeError();
  }

  if (!password.validity.valid) {
    showPasswordError();
  }

  if (
    !confirmPassword.validity.valid ||
    !(confirmPassword.value === password.value)
  ) {
    showConfirmPassError();
  }

  if (
    email.validity.valid &&
    country.validity.valid &&
    zipcode.validity.valid &&
    password.validity.valid &&
    confirmPassword.value === password.value
  ) {
    document.querySelector(".successfulSubmission").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
    form.reset();
  }

  e.preventDefault();
});
