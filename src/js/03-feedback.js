import throttle from 'lodash.throttle';

const LOCALESTORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onInputForm, 500));

function onInputForm() {
  const feedback = getFormValues(formEl);
  localStorage.setItem(LOCALESTORAGE_KEY, JSON.stringify(feedback));
}

const storedFeedback = localStorage.getItem(LOCALESTORAGE_KEY);
const parsedFeedback = getParsedFeedback(storedFeedback);

function getParsedFeedback(storedValue) {
  try {
    const parsedValue = JSON.parse(storedValue);
    return parsedValue;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  onFormSubmit(evt);
  evt.currentTarget.reset();
});

function onFormSubmit({ currentTarget }) {
  if (!localStorage.getItem(LOCALESTORAGE_KEY))
    return alert('Введіть дані у форму!');
  localStorage.removeItem(LOCALESTORAGE_KEY);
  const feedback = getFormValues(currentTarget);
  console.log(feedback);
}

function checkLocalStorage(parsedValue, form) {
  if (!localStorage.getItem(LOCALESTORAGE_KEY)) return;
  const formData = Object.entries(parsedValue);
  formData.forEach((value, i) => (form.elements[i].value = value[1]));
}

checkLocalStorage(parsedFeedback, formEl);

function getFormValues(form) {
  const formValues = Object.fromEntries(new FormData(form));
  return formValues;
}
