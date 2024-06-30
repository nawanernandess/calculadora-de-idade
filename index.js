const months = [
  "Janeiro",
  "Fevereiro",
  "Marco",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const todayDate = new Date();
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");

function init() {
  createOptionSelector(months, "#month", "option", true);
  changeDays();
}

function ageResult() {
  const adjustMonth = month.options[month.selectedIndex].value - 1;
  const selectedBirthDate = new Date(
    year.value,
    adjustMonth,
    day.options[day.selectedIndex].value
  );

  let years = todayDate.getFullYear() - selectedBirthDate.getFullYear();
  let months = todayDate.getMonth() - selectedBirthDate.getMonth();
  let days = todayDate.getDate() - selectedBirthDate.getDate();
  let birthday = birthDay(selectedBirthDate);

  if (
    months < 0 ||
    (months === 0 && todayDate.getDate() < selectedBirthDate.getDate())
  ) {
    years--;
    months += 12;
  }

  showResultHtml(years, months, days, birthday);
  return;
}

function birthDay(birthday) {
  let nextBirth = new Date(
    todayDate.getFullYear(),
    birthday.getMonth(),
    birthday.getDate()
  );

  if (todayDate > nextBirth) {
    nextBirth.setFullYear(todayDate.getFullYear() + 1);
  }

  let byrdayMillSecond = nextBirth - todayDate;
  return Math.ceil(byrdayMillSecond / (1000 * 60 * 60 * 24));
}

function changeDays() {
  let months = month.options[month.selectedIndex].value;
  let selectedDay = getSelectedValues(day);

  day.innerHTML = "";

  let lastDay = new Date(year.value, months, 0).getDate();
  let option;

  for (let i = 1; i <= lastDay; i++) {
    option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    day.appendChild(option);
  }
  restoreSelectedValues(day, selectedDay);
}

function showResultHtml(showYear, month, day, birthday) {
  let spanError = document.getElementById("error");

  if (year.value == "" || year.value.length < 4) {
    year.classList.add("input-border-error");
    spanError.classList.add("info-error");
    return;
  }

  year.classList.remove("input-border-error");
  spanError.classList.remove("info-error");

  document.getElementById("yaear-value").innerHTML = `${showYear} Anos`;
  document.getElementById("month-value").innerHTML = `${month} Meses`;
  document.getElementById("day-value").innerHTML = `${day} Dias`;
  document.getElementById(
    "birthDay-value"
  ).innerHTML = `Faltam ${birthday} dias para o seu aniversário!`;
}

function createOptionSelector(
  array,
  selectorElement,
  createElement,
  addCouter = false
) {
  array.forEach((month, index) => {
    let selector = document.querySelector(selectorElement);
    let elem = document.createElement(createElement);

    selector.appendChild(elem);
    elem.textContent = month;
    elem.value = addCouter ? index + 1 : index;
  });
}

function getSelectedValues(select) {
  let selectedValues = [];
  for (let option of select.options) {
    if (option.selected) {
      selectedValues.push(option.value);
    }
  }
  return selectedValues;
}

function restoreSelectedValues(select, selectedValues) {
  let valueExists = false;

  for (let option of select.options) {
    if (selectedValues.includes(option.value)) {
      option.selected = true;
      valueExists = true;
    } else {
      option.selected = false;
    }
  }

  if (!valueExists && select.options.length < 31) {
    select.options[select.options.length - 1].selected = true;
  }
}
