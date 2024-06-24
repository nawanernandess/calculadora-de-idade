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
const dayOfTheMonth = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];
const todayDate = new Date();
var removeElement = false;

function init() {
  createOptions(dayOfTheMonth, "#day", "option", true);
  createOptions(months, "#month", "option");
}

function ageResult() {
  const objDate = new Date(
    selectBirthDate().year,
    selectBirthDate().month,
    selectBirthDate().day
  );
  const selectedBirthDate = objDate;
  let inputStyleErro = document.querySelector("#year");
  let spanError = document.getElementById("error");
  let yearEmpty = selectBirthDate().year;
  let years = todayDate.getFullYear() - selectedBirthDate.getFullYear();
  let months = todayDate.getMonth() - selectedBirthDate.getMonth();
  let days = todayDate.getDate() - selectedBirthDate.getDate();
  let birthday = birthDay(selectedBirthDate);

  if (yearEmpty == "" || yearEmpty.length < 4) {
    inputStyleErro.classList.add("input-border-error");
    spanError.classList.add("info-error");
    showHtml(0, 0, 0, 0);
    return;
  } else {
    inputStyleErro.classList.remove("input-border-error");
    spanError.classList.remove("info-error");
  }

  showHtml(years, months, days, birthday);
  return;
}

function birthDay(birthday) {
  let birth = new Date(birthday);
  let nextBirth = new Date(
    todayDate.getFullYear(),
    birth.getMonth(),
    birth.getDate()
  );

  if (todayDate > nextBirth) {
    nextBirth.setFullYear(todayDate.getFullYear() + 1);
  }

  let byrdayMillSecond = nextBirth - todayDate;
  return Math.ceil(byrdayMillSecond / (1000 * 60 * 60 * 24));
}

function selectBirthDate() {
  let day = document.querySelector("#day");
  let month = document.querySelector("#month");
  let year = document.querySelector("#year");
  let leapYear = isLeapYear(year.value);
  let array = [...dayOfTheMonth];

  if (
    month.value == 3 ||
    month.value == 5 ||
    month.value == 8 ||
    month.value == 10
  ) {
    removeElement = true;
    array.pop();
    removeElementHtml(dayOfTheMonth, "#day");
    createOptions(array, "#day", "option", true);
    return;
  }

  if (month.value == 1) {
    removeElement = true;
    if (leapYear) {
      array.splice(-2);
      removeElementHtml(dayOfTheMonth, "#day");
      createOptions(array, "#day", "option", true);
    } else {
      array.splice(-3);
      removeElementHtml(dayOfTheMonth, "#day");
      createOptions(array, "#day", "option", true);
    }
  } else {
    if (removeElement) {
      removeElementHtml(dayOfTheMonth, "#day");
      createOptions(dayOfTheMonth, "#day", "option", true);
    }
  }

  return {
    year: year.value,
    month: month.options[month.selectedIndex].value,
    day: day.options[day.selectedIndex].value,
  };
}

function createOptions(
  array,
  selectorElement,
  createElement,
  hasAddCouter = false
) {
  array.forEach((month, index) => {
    let selector = document.querySelector(selectorElement);
    let elem = document.createElement(createElement);

    selector.appendChild(elem);
    elem.textContent = month;
    elem.value = hasAddCouter ? index + 1 : index;
  });
}

function removeElementHtml(array, removeSelectorElement) {
  let selector = document.querySelector(removeSelectorElement);

  array.forEach(() => {
    if (removeElement) {
      if (selector.hasChildNodes()) {
        selector.removeChild(selector.firstElementChild);
      }
      return;
    }
  });
}

function isLeapYear(year) {
  switch (true) {
    case year == "":
      return false;
    case year % 4 == 0 && year % 100 != 0:
      return true;
    case year % 400 == 0:
      return true;
    default:
      return false;
  }
}

function showHtml(year, month, day, birthday) {
  document.getElementById("yaear-value").innerHTML = `${year} Anos`;
  document.getElementById("month-value").innerHTML = `${month} Meses`;
  document.getElementById("day-value").innerHTML = `${day} Dias`;
  document.getElementById("birthDay-value").innerHTML = `${birthday} Dias`;
}
