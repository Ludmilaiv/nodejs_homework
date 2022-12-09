import readline from 'readline';
import EventEmitter from "events";

const rl = readline.createInterface({ 
  input: process.stdin, 
  output: process.stdout
});

function getMonthLength(year, monthNumber)
{
  const monthLength = [31, 28, 31, 30, 31, 31, 30, 31, 30, 31];
  if (monthNumber != 2) {
    return monthLength[monthNumber - 1];
  }
  if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
    return 29;
  } 
  return 28;
}

class Time {
  constructor(dateString) {
    const [hours, date, month, year] = dateString.split("-");
    console.log(dateString.split("-"));
    this.hours = hours;
    this.date = date;
    this.month = month;
    this.year = year;
  }
  show() {
    console.log(`Осталось: ${this.hours}-${this.date}-${this.month}-${this.year}`);
  }
}

const changeYear = time => {
  if (time.year == 1) {
    console.log("Все таймеры закончились");
  } else {
    time.year--;
    time.show();
    setTimeout(() => changeHours(time), 1000);
  }
}

const changeMonth = time => {
  if (time.month == 1) {
    time.month = 12;
    console.log("Таймеры дней, часов и месяцев закончились");
    setTimeout(() => changeYear(time), 1000);
  } else {
    time.month--;
    time.show();
    setTimeout(() => changeHours(time), 1000);
  }
}

const changeDate = time => {
  if (time.date == 1) {
    time.date = getMonthLength(time.year, time.month);
    console.log("Таймеры часов и месяцев закончились");
    setTimeout(() => changeMonth(time), 1000);
  } else {
    time.date--;
    time.show();
    setTimeout(() => changeHours(time), 1000);
  }
}

const changeHours = time => {
  if (time.hours == 1) {
    time.hours = 23;
    console.log("Таймер часов закончился");
    setTimeout(() => changeDate(time), 1000);
  } else {
    time.hours--;
    time.show();
    setTimeout(() => changeHours(time), 1000);
  }
}

rl.question("Введите дату: ", (dateString) => {
  const time = new Time(dateString);
  setTimeout(() => changeHours(time), 1000);
  rl.close();
});
