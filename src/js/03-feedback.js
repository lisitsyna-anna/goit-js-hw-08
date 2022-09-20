import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('.feedback-form input'),
  textareaMsg: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

populateForm();

const formData = {};

refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', throttle(onFormSubmit, 500));

function onFormInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();

  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedFormData);
  localStorage.removeItem(STORAGE_KEY);
}

function populateForm() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFormData) {
    refs.inputEmail.value = savedFormData.email;
    refs.textareaMsg.value = savedFormData.message;
  }
}
