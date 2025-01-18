const fs = require('fs').promises;
const path = require('path');

const originalDir = path.join(__dirname, 'styles');
const outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

function copyAndMergeCssFiles(src, output) {
  return fs
    .readdir(src)
    .then((files) => {
      const cssFiles = files.filter(
        (file) => path.extname(file).toLowerCase() === '.css',
      );

      if (cssFiles.length === 0) {
        console.log('No file with .css');
        return;
      }

      return fs.writeFile(output, '', { flag: 'w' }).then(() => {
        const filePromises = cssFiles.map((file) => {
          const srcFile = path.join(src, file);
          return fs
            .readFile(srcFile, 'utf8')
            .then((data) => fs.appendFile(output, data + '\n'))
        });

        return Promise.all(filePromises);
      });
    })
    .then(() => {
      console.log(`Содержимое .css файлов скопировано в '${output}'`);
    })

}

function initCopyCssFiles() {
  copyAndMergeCssFiles(originalDir, outputFile);
}

initCopyCssFiles();
