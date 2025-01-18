const fs = require('fs');
const path = require('path');

const secretFolder = '03-files-in-folder/secret-folder';

fs.readdir(secretFolder, (_err, files) => {
  const filePromises = files.map(file => {
    const fullPathFile = path.join(secretFolder, file);
    
    return new Promise((resolve, _reject) => {
      fs.stat(fullPathFile, (_err, stats) => {


        if (stats.isFile()) {
          const fileName = path.basename(fullPathFile, path.extname(fullPathFile));
          const fileExtName = path.extname(fullPathFile);
          const fileSize = stats.size / 1000;

          resolve(`${fileName} - ${fileExtName.slice(1)} - ${fileSize}kb`);
        } else {
          resolve(null);
        }
      });
    });
  });

  Promise.all(filePromises)
    .then(results => {
      results.forEach(result => {
        if (result) {
          console.log(result);
        }
      });
    })
});