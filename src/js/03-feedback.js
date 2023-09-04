const throttle = require('lodash.throttle');

// забираю елементи форм
const formEl = document.querySelector('form');
const inputEmailEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');

// викликаю функцію, яка перевіряє локальне сховище та заповнює поля форми даними
updateFormEl();

// слухаю події форми
formEl.addEventListener('input', throttle(onFormElInput, 500));
formEl.addEventListener('submit', onBtnSubmit);

// збираю значення з інпуту та текстерії та додаю до локального сховища
function onFormElInput() {
  if (inputEmailEl.value !== '' || textareaEl.value !== '') {
    const resultForm = { email: inputEmailEl.value, message: textareaEl.value };
    localStorage.setItem('feedback-form-state', JSON.stringify(resultForm));
    // console.log(resultForm);
  }
}

// функція, яка перевіряє локальне сховище та заповнює поля форми даними
function updateFormEl() {
  if (localStorage.getItem('feedback-form-state') === null) {
    return;
  }
  const values = JSON.parse(localStorage.getItem('feedback-form-state'));
  inputEmailEl.value = values.email;
  textareaEl.value = values.message;
}

//функція відправки форми
function onBtnSubmit(evt) {
  //  забороняю перезавантаження
  evt.preventDefault();

  // деструтуризую об'єкт елементів
  const {
    elements: { email: emailForm, message: messageForm },
  } = evt.currentTarget;

  // забираю значення пошти та повідомлення і виводжу у консоль
  if (emailForm.value !== '' && messageForm.value !== '') {
    const resultForm = { email: emailForm.value, message: messageForm.value };

    console.log(resultForm);
  }
  // очищую форму та сховище
  evt.currentTarget.reset();
  localStorage.clear();
}
