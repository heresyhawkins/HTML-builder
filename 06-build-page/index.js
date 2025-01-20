const fs = require('fs').promises;
const path = require('path');

const createDirectory = (dirPath) => {
  fs.mkdir(dirPath, { recursive: true }, (_err) => {
    console.log(`Folder is create ${dirPath}`);
  });
};

const pathToDir = path.join(__dirname, 'project-dist');
createDirectory(pathToDir);

const bundleStyles = () => {
  const stylesDir = path.join(__dirname, 'styles');
  const outputFile = path.join(__dirname, 'project-dist', 'style.css');

  return fs
    .readdir(stylesDir)
    .then((files) => {
      const cssFiles = files.filter(
        (file) => path.extname(file).toLowerCase() === '.css',
      );

      if (cssFiles.length === 0) {
        console.log('No .css files found');
        return;
      }

      return fs.writeFile(outputFile, '', { flag: 'w' }).then(() => {
        const filePromises = cssFiles.map((file) => {
          const srcFile = path.join(stylesDir, file);
          return fs
            .readFile(srcFile, 'utf8')
            .then((data) => fs.appendFile(outputFile, data + '\n'));
        });

        return Promise.all(filePromises);
      });
    })
    .then(() => {
      console.log(`CSS files bundle in '${outputFile}'`);
    });
};

function replaceTags() {
  const templateFile = path.join(__dirname, 'template.html');
  const componentsDir = path.join(__dirname, 'components');
  const outputHtmlFile = path.join(__dirname, 'project-dist', 'index.html');

  return fs
    .readFile(templateFile, 'utf8')
    .then((templateContent) => {
      return fs.readdir(componentsDir).then((componentFiles) => {
        const replacePromises = componentFiles.map((file) => {
          const componentName = path.basename(file, '.html');
          const componentPath = path.join(componentsDir, file);
          const tag = `{{${componentName}}}`;

          return fs.readFile(componentPath, 'utf8').then((componentContent) => {
            templateContent = templateContent.replace(
              new RegExp(tag, 'g'),
              componentContent,
            );
          });
        });

        return Promise.all(replacePromises).then(() =>
          fs.writeFile(outputHtmlFile, templateContent),
        );
      });
    })
    .then(() => {
      console.log(`Tags replaced and saved in '${outputHtmlFile}'`);
    });
}

const defaultFolderAssetsFonts = path.join(__dirname, 'assets', 'fonts');
const placeForFolderAssetsFonts = path.join(
  __dirname,
  'project-dist',
  'assets',
  'fonts',
);
const defaultFolderAssetsImg = path.join(__dirname, 'assets', 'img');
const placeForFolderAssetsImg = path.join(
  __dirname,
  'project-dist',
  'assets',
  'img',
);
const defaultFolderAssetsSvg = path.join(__dirname, 'assets', 'svg');
const placeForFolderAssetsSvg = path.join(
  __dirname,
  'project-dist',
  'assets',
  'svg',
);

const moveFolderAssets = (original, created) => {
  return fs
    .mkdir(created, { recursive: true })
    .then(() => {
      return fs.readdir(original);
    })
    .then((files) => {
      const copyPromises = files.map((file) => {
        const orgFile = path.join(original, file);
        const crtFile = path.join(created, file);

        return fs.copyFile(orgFile, crtFile);
      });

      return Promise.all(copyPromises);
    })
    .then(() => {
      console.log(`Folfer '${original}' copied in '${created}'`);
    })
    .catch((_err) => {});
};

moveFolderAssets(defaultFolderAssetsFonts, placeForFolderAssetsFonts);
moveFolderAssets(defaultFolderAssetsImg, placeForFolderAssetsImg);
moveFolderAssets(defaultFolderAssetsSvg, placeForFolderAssetsSvg);

bundleStyles();

replaceTags();
