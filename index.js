import readline from 'readline';
import EventEmitter from "events";

const rl = readline.createInterface({ 
  input: process.stdin, 
  output: process.stdout
});

class Time {
  constructor(dateString) {
    const [hours, date, month, year] = dateString.split("-");
    this.hours = hours;
    this.date = date;
    this.month = month;
    this.year = year;
  }
  show() {
    console.log(`${this.hours}-${this.date}-${this.month}-${this.year}`);
  }
}

const getMonthLength = (year, monthNumber) => {
  const monthLength = [31, 28, 31, 30, 31, 31, 30, 31, 30, 31];
  if (monthNumber != 2) {
    return monthLength[monthNumber - 1];
  }
  if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
    return 29;
  } 
  return 28;
}

const delay = (ms) => {
  return new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
  });
};

class Handler {
  static changeYear(time) {
    time.year--;
    time.show();
  }

  static changeMonth(time) {
    time.month--;
    time.show();
  }

  static changeDate(time) {
    time.date--;
    time.show();
  }

  static changeHours(time) {
    time.hours--;
    time.show();
  }

  static finishHours(time) {
    time.hours = 23;
    console.log("Таймер часов закончился");
  }

  static finishMonth(time) {
    time.month = 12;
    console.log("Таймер месяцев закончился");
  }

  static finishDate(time) {
    time.date = getMonthLength(time.year, time.month);
    console.log("Таймер дней закончился");
  }

  static finishYears(time) {
    console.log("Таймер лет закончился");
  }
}

class MyEmitter extends EventEmitter {};
const emitterObject = new MyEmitter();

emitterObject.on('changeYear', Handler.changeYear);
emitterObject.on('changeMonth', Handler.changeMonth);
emitterObject.on('changeDate', Handler.changeDate);
emitterObject.on('changeHours', Handler.changeHours);
emitterObject.on('finishYears', Handler.finishYears);
emitterObject.on('finishMonth', Handler.finishMonth);
emitterObject.on('finishDate', Handler.finishDate);
emitterObject.on('finishHours', Handler.finishHours);

 const timerTick = time => {
  if (time.hours == 1) {
    delay(1000).then(emitterObject.emit('finishHours', time));
    if (time.date == 1) {
      delay(1000).then(emitterObject.emit('finishDate', time));
      if (time.month == 1) {
        delay(1000).then(emitterObject.emit('finishMonth', time));
        if (time.year == 1) {
          delay(1000).then(emitterObject.emit('finishYears', time));
          return;
        }
        emitterObject.emit('changeYear', time);
      } else {
        emitterObject.emit('changeMonth', time);
      } 
    } else {
      emitterObject.emit('changeDate', time);
    }
  } else {
    emitterObject.emit('changeHours', time);
  }  
  delay(1000).then(() => timerTick(time));
}

rl.question("Введите дату: ", (dateString) => {
  const time = new Time(dateString);
  delay(1000).then(() => timerTick(time));
  rl.close();
});
