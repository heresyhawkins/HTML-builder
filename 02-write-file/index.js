const fs = require('fs');
const path = require('path');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const outputFile = path.join('02-write-file/text.txt');

const askInputFile = () => {
  readline.question('Write ur text file! If u need exit write "exit": ', (inputFile) => {
    if (inputFile === 'exit') {
      console.log('File save, bye');
      readline.close();
      return;
    }

    fs.appendFile(outputFile, inputFile, (err) => {
      if (err) {
        console.error('Error', err);
      } else {
        console.log(
          "Your text has been appended to text.txt",
        );
      }
      askInputFile();
    });
  });
};

askInputFile();
