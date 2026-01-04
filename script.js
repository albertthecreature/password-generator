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

// Дневной/ночной режим (демо)

// const date = new Date()

// if (date.getHours() <= 6 || date.getHours() >= 18) {
//     document.body.style.backgroundColor = 'black'
//     document.body.style.color = '#648fc7'
//     copyButton.style.color = '#648fc7'
//     copyButton.style.borderColor = '#648fc7'
//     refreshButton.style.color = '#648fc7'
//     refreshButton.style.borderColor = '#648fc7'
//     languageSelect.style.color = '#648fc7'
//     languageSelect.style.borderColor = '#648fc7'
//     levelSelect.style.color = '#648fc7'
//     levelSelect.style.borderColor = '#648fc7'
//     inputPassword.style.color = '#648fc7'
//     inputPassword.style.borderColor = '#648fc7'
//     readyPassword1.style.borderColor = '#648fc7'
//     readyPassword2.style.borderColor = '#648fc7'
//     readyPassword3.style.borderColor = '#648fc7'
//     readyPassword4.style.borderColor = '#648fc7'
//     readyPassword5.style.borderColor = '#648fc7'
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

readyPassword1.innerHTML = readyPasswordGenerator();
readyPassword1.onclick = function () {
  navigator.clipboard.writeText(readyPassword1.value);
};

readyPassword2.innerHTML = readyPasswordGenerator();
readyPassword2.onclick = function () {
  navigator.clipboard.writeText(readyPassword2.value);
};

readyPassword3.innerHTML = readyPasswordGenerator();
readyPassword3.onclick = function () {
  navigator.clipboard.writeText(readyPassword3.value);
};
readyPassword4.innerHTML = readyPasswordGenerator();
readyPassword4.onclick = function () {
  navigator.clipboard.writeText(readyPassword4.value);
};
readyPassword5.innerHTML = readyPasswordGenerator();
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

function checkPassword(string) {
  let numberPattern = /[0-9]/g;
  let symbolsPattern = /[!#$%&'()*+,-./:;<=>?@^_`\ {|}~]/g;
  let lettersPattern = /[a-zA-Zа-яА-Я]/g;

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

const outputMark = document.getElementById("outputMark");

inputPassword.onchange = function () {
  var currentValue = this.value;
  outputMark.innerHTML = checkPassword(currentValue);
  inputPassword.style.width = inputPassword.length * 16 + "px";
  if (checkPassword(currentValue) === "GOOD PASSWORD") {
    outputMark.style.color = "green";
  } else outputMark.style.color = "red";
};
