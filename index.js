const dateNow = new Date();

function ageResult() {
  const dateSelected = dateSelected();
  let years = dateNow.getFullYear() - dateSelected.getFullYear();
  let months = dateNow.getMonth() - dateSelected.getMonth();
  let days = dateNow.getDate() - dateSelected.getDate();
  let birthday = birthDay(dateSelected);

  return {
    years,
    months,
    days,
    birthday,
  };
}

function birthDay(birthday) {
  let birth = new Date(birthday);
  let nextBirth = new Date(
    dateNow.getFullYear(),
    birth.getMonth(),
    birth.getDate()
  );

  if (dateNow > nextBirth) {
    nextBirth.setFullYear(dateNow.getFullYear() + 1);
  } else {
    return "Feliz Aniversário!!";
  }

  let byrdayMillSecond = nextBirth - dateNow;
  return Math.ceil(byrdayMillSecond / (1000 * 60 * 60 * 24));
}

function dateSelected() {
  let day = document.querySelector("#day");
  let month = document.querySelector("#month");
  let year = document.querySelector("#year");

  return new Date(
    year.value,
    month.options[month.selectedIndex].value,
    day.options[day.selectedIndex].value
  );
}
