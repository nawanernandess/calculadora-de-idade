const todayDate = new Date();

function ageResult() {
  const selectedBirthDate = selectBirthDate();
  let years = todayDate.getFullYear() - selectedBirthDate.getFullYear();
  let months = todayDate.getMonth() - selectedBirthDate.getMonth();
  let days = todayDate.getDate() - selectedBirthDate.getDate();
  let birthday = birthDay(selectedBirthDate);

  document.getElementById("yaear-value").innerHTML = `${years} Anos`;
  document.getElementById("month-value").innerHTML = `${months} Meses`;
  document.getElementById("day-value").innerHTML = `${days} Dias`;
  document.getElementById("birthDay-value").innerHTML = `${birthday} Dias`;

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
  } else {
    return "Feliz Aniversário!!";
  }

  let byrdayMillSecond = nextBirth - todayDate;
  return Math.ceil(byrdayMillSecond / (1000 * 60 * 60 * 24));
}

function selectBirthDate() {
  let day = document.querySelector("#day");
  let month = document.querySelector("#month");
  let year = document.querySelector("#year");

  return new Date(
    year.value,
    month.options[month.selectedIndex].value,
    day.options[day.selectedIndex].value
  );
}
