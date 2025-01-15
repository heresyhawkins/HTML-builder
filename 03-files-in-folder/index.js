const fs = require('fs');
const path = require('path');

const secretFolder = '03-files-in-folder/secret-folder';

fs.readdir(secretFolder, (_err, files) => {
  files.forEach((file) => {
    fs.stat(`${secretFolder}/${file}`, (_err, stats) => {
      const fullPathFile = path.join(secretFolder, file);

      if (fs.statSync(fullPathFile).isFile()) {
        const fileName = path.basename(
          fullPathFile,
          path.extname(fullPathFile),
        );
        const fileExtName = path.extname(fullPathFile);
        const fileSize = stats.size / 1000;

        console.log(`${fileName} - ${fileExtName.slice(1)} - ${fileSize}`);
      }
    });
  });
});
