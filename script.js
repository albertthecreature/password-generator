const copyButton = document.getElementById("copyButton");
const refreshButton = document.getElementById("refreshButton");
const languageSelect = document.getElementById("languageSelect");
const levelSelect = document.getElementById("levelSelect");
const copyLink = document.getElementById("copyLink");
const readyPassword = "";
const readyPassword1 = document.getElementById("readyPassword1");
const readyPassword2 = document.getElementById("readyPassword2");
const readyPassword3 = document.getElementById("readyPassword3");
const readyPassword4 = document.getElementById("readyPassword4");
const readyPassword5 = document.getElementById("readyPassword5");
const inputPassword = document.getElementById("inputPassword");
const clientPasswordCopyButton = document.getElementById("client-password-button");
const outputMark = document.getElementById("outputMark");


// Дневной/ночной режим (демо)

// const date = new Date();

// if (date.getHours() <= 6 || date.getHours() >= 18) {
//   var lightBlue = "#648fc7";
//   document.body.style.backgroundColor = "#000";
//   document.body.style.color = lightBlue;
//   copyButton.style.color = lightBlue;
//   copyButton.style.borderColor = lightBlue;
//   refreshButton.style.color = lightBlue;
//   refreshButton.style.borderColor = lightBlue;
//   languageSelect.style.color = lightBlue;
//   languageSelect.style.borderColor = lightBlue;
//   levelSelect.style.color = lightBlue;
//   levelSelect.style.borderColor = lightBlue;
//   inputPassword.style.color = lightBlue;
//   inputPassword.style.borderColor = lightBlue;
//   readyPassword1.style.borderColor = lightBlue;
//   readyPassword2.style.borderColor = lightBlue;
//   readyPassword3.style.borderColor = lightBlue;
//   readyPassword4.style.borderColor = lightBlue;
//   readyPassword5.style.borderColor = lightBlue;
// }

// Функция выбора языка пароля

function languageSelection(lang = 0) {
  var str = "";
  if (lang === 0) {
    str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  } else if (lang === 1) {
    str = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
  } else if (lang === 2) {
    str =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
  }
  return str;
}

// Функция выбора уровня сложности пароля

function levelSelection(lvl = 0) {
  var str = "";
  var numbers = "0123456789";
  var symbols = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

  if (lvl === 0) {
    str;
  } else if (lvl === 1) {
    str = numbers;
  } else if (lvl === 2) {
    str = numbers + symbols;
  }
  return str;
}

// Функция создания случайного пароля. В агрументах функции количество символов, выбранный язык, выбранный уровень сложности

function passwordGenerator(count, language, level) {
  // функция-генератор пароля

  var str = languageSelection(language) + levelSelection(level);

  const arrStr = str.split("");
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(arrStr[Math.floor(Math.random(i) * arrStr.length)]);
  }
  return result.join("");
}

// Функция создания готового пароля (комбинация обновляется при перезагрузке страницы)

function readyPasswordGenerator() {
  var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var hyphen = "-";

  const result = [];
  const arrStr = str.split("");
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      result.push(arrStr[Math.floor(Math.random(i) * arrStr.length)]);
    }
    result.push(hyphen);
  }
  result.splice(-1);
  return result.join("");
}

// присваиваем переменным readyPassword1...readyPassword5 заговленные пароли
// ниже функция копирования пароля в буфер обмена

readyPassword1.value = readyPasswordGenerator();
readyPassword1.onclick = function () {
  navigator.clipboard.writeText(readyPassword1.value);
};

readyPassword2.value = readyPasswordGenerator();
readyPassword2.onclick = function () {
  navigator.clipboard.writeText(readyPassword2.value);
};

readyPassword3.value = readyPasswordGenerator();
readyPassword3.onclick = function () {
  navigator.clipboard.writeText(readyPassword3.value);
};
readyPassword4.value = readyPasswordGenerator();
readyPassword4.onclick = function () {
  navigator.clipboard.writeText(readyPassword4.value);
};
readyPassword5.value = readyPasswordGenerator();
readyPassword5.onclick = function () {
  navigator.clipboard.writeText(readyPassword5.value);
};

const inputRange = document.getElementById("inputRange");
const output = document.getElementById("demo");
output.innerHTML = inputRange.value; // показывает, какое число сейчас актуально в рейндж

var generatedPassword = passwordGenerator(
  inputRange.value,
  languageSelect.selectedIndex,
  levelSelect.selectedIndex
);
const password = document.getElementById("password");
password.value = generatedPassword; // показывает в поле "ПАРОЛЬ" текущий пароль при только что загруженной странице
// password.style.width = this.value * 16 + "px";

// Функции копирования значение поля "ПАРОЛЬ" в буфер

copyButton.onclick = function () {
  navigator.clipboard.writeText(generatedPassword);
};
copyLink.onclick = function () {
  navigator.clipboard.writeText(generatedPassword);
};

// Функция изменения пароля при изменении значения РЕЙНДЖ

inputRange.oninput = function () {
  var currentValue = this.value;
  output.innerHTML = currentValue;
  const generatedNewPassword = passwordGenerator(
    currentValue,
    languageSelect.selectedIndex,
    levelSelect.selectedIndex
  );
  const password1 = document.getElementById("password");
  password1.value = generatedNewPassword;
  // password1.style.width = (currentValue * 16) + 'px'
  generatedPassword = generatedNewPassword;
};

// Функция обновления пароля при нажатии кнопки "Refresh"

refreshButton.onclick = function () {
  output.innerHTML = inputRange.value;
  const generatedNewPassword = passwordGenerator(
    inputRange.value,
    languageSelect.selectedIndex,
    levelSelect.selectedIndex
  );
  const password1 = document.getElementById("password");
  password1.value = generatedNewPassword;
  generatedPassword = generatedNewPassword;
};

// Функция обновления пароля при изменении значения в списке языков

languageSelect.onchange = function () {
  output.innerHTML = inputRange.value;
  const generatedNewPassword = passwordGenerator(
    inputRange.value,
    languageSelect.selectedIndex,
    levelSelect.selectedIndex
  );
  const password1 = document.getElementById("password");
  password1.value = generatedNewPassword;
  generatedPassword = generatedNewPassword;
};

// Функция обновления пароля при изменении значения в списке уровней сложности

levelSelect.onchange = function () {
  output.innerHTML = inputRange.value;
  const generatedNewPassword = passwordGenerator(
    inputRange.value,
    languageSelect.selectedIndex,
    levelSelect.selectedIndex
  );
  const password1 = document.getElementById("password");
  password1.value = generatedNewPassword;
  generatedPassword = generatedNewPassword;
};

copyButton.onclick = function () {
  navigator.clipboard.writeText(generatedPassword); // копирует измененный пароль
};

copyLink.onclick = function () {
  navigator.clipboard.writeText(generatedPassword); // копирует значение поля "ПАРОЛЬ"
};

// Функция проверки пароля пользователя

function checkPassword(string) {
  let numberPattern = /[0-9]/g;
  let symbolsPattern = /[!#$%&'()*+,-./:;<=>?@^_`\ {|}~]/g;
  let lettersPattern = /[a-zA-Zа-яА-Я]/g;

  if (string.length === 0) {
    return "check";
  }

  if (string.length <= 12) {
    return "BAD PASSWORD. good password extends more symbols";
  }
  if (!isNaN(string)) {
    return "BAD PASSWORD. add letters or symbols";
  }
  if (!string.match(lettersPattern)) {
    return "BAD PASSWORD. add letters";
  }
  if (string === string.toUpperCase()) {
    return "BAD PASSWORD. add letters with different CaSeS";
  }
  if (string === string.toLowerCase()) {
    return "BAD PASSWORD. add letters with different cases";
  }
  if (!string.match(numberPattern)) {
    return "BAD PASSWORD. add numbers or symbols";
  }
  if (!string.match(symbolsPattern)) {
    return "BAD PASSWORD. add symbols!!!";
  } else return "GOOD PASSWORD";
}

// Функция выдачи результата после проверки

inputPassword.onchange = function () {
  outputMark.value = checkPassword(this.value);
  if (checkPassword(this.value) === "GOOD PASSWORD") {
    outputMark.style.color = "green";
  } else outputMark.style.color = "red";
};

// Копирование придуманного пользователем пароля

clientPasswordCopyButton.onclick = function() {
  navigator.clipboard.writeText(inputPassword.value);
}