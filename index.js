import readline from 'readline';
import fs from 'fs';

const rs = fs.createReadStream('./access_tmp.log', 'utf8');

const rl = readline.createInterface({ 
  input: rs, 
  output: process.stdout,
  terminal: false,
});

const searchIP_1 = '89.123.1.41';
const searchIP_2 = '34.48.240.111';

const main = async () => {
  await fs.writeFile(`ip-${searchIP_1}`, '', err => {if (err) console.log(err)});
  await fs.writeFile(`ip-${searchIP_2}`, '', err => {if (err) console.log(err)});
  rl.on('line',(line) => {
    if (line.indexOf(searchIP_1) == 0) {
      fs.writeFile(`ip-${searchIP_1}`, line + '\n', { flag: 'a' }, err => {if (err) console.log(err)})
    } else if (line.indexOf(searchIP_2) == 0) {
      fs.writeFile(`ip-${searchIP_2}`, line + '\n', { flag: 'a' }, err => {if (err) console.log(err)})
    }
  });
}

main();
