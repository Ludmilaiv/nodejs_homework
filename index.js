import colors from "colors";
import readline from 'readline';

const rl = readline.createInterface({ 
  input: process.stdin, 
  output: process.stdout
});

const isPrime = (number) => {
  const max = Math.sqrt(number);
  let prime = true;
  for (let i = 2; i <= max; i++) {
    if (number % i === 0) {
      prime = false;
      break;
    }
  }
  return prime;
}

rl.question("Введите начало диапазона ", (beginNumber) => {
  rl.question("Введите начало диапазона ", (endNumber) => {
    if (!Number(beginNumber) || !Number(endNumber)){
      throw "Один из аргументов не является числом!";
    }
    let count = 0;
    for (let i = beginNumber; i <= endNumber; i++) {
      if (isPrime(i)) {
        count++;
        count % 3 === 0 ? console.log(colors.red(i)) : 
        count % 3 === 1 ? console.log(colors.green(i)) :
        console.log(colors.yellow(i));
      }
    }
    if (count === 0) {
      console.log(colors.red("Простых чисел в диапазоне нет"))
    }
    rl.close();
  });
});
