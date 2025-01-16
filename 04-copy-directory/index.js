const fs = require('fs');
const path = require('path');


async function copyDir() {
    const sourceDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files-copy');

    await fs.promises.rm(destDir, { recursive: true, force: true });

    await fs.promises.mkdir(destDir, { recursive: true });

    const files = await fs.promises.readdir(sourceDir);

    for (const file of files) {
        const srcFile = path.join(sourceDir, file);
        const destFile = path.join(destDir, file);
        
        const stat = await fs.promises.stat(srcFile);
        if (stat.isFile()) {
            await fs.promises.copyFile(srcFile, destFile);
        } else if (stat.isDirectory()) {
            console.log(`Skipping directory: ${srcFile}`);
        }
    }
}


copyDir()
    .then(() => console.log('Directory copied successfully!'))
    .catch(err => console.error(`Error: ${err.message}`));