import throttle from 'lodash.throttle';

const LOCALESTORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onInputForm, 500));

function onInputForm() {
  const feedback = getFormValues(formEl);
  localStorage.setItem(LOCALESTORAGE_KEY, JSON.stringify(feedback));
}

const storedFeedback = localStorage.getItem(LOCALESTORAGE_KEY);
const parsedFeedback = JSON.parse(storedFeedback);

formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  onFormSubmit(evt);
  evt.currentTarget.reset();
});

function onFormSubmit({ currentTarget }) {
  if (localStorage.getItem(LOCALESTORAGE_KEY) === null)
    return alert('Введіть дані у форму!');
  localStorage.removeItem(LOCALESTORAGE_KEY);
  const feedback = getFormValues(currentTarget);
  console.log(feedback);
}

function checkLocalStorage(form) {
  if (localStorage.getItem(LOCALESTORAGE_KEY) === null) return;
  form.email.value = parsedFeedback.email;
  form.message.value = parsedFeedback.message;
}

checkLocalStorage(formEl);

function getFormValues(form) {
  const formValues = {
    email: form.email.value,
    message: form.message.value,
  };
  return formValues;
}

