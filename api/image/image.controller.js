'use strict';
var fs = require('fs');

exports.uploadImages = async (req, res) => {
  const subfolder = req.params.folder;
  const imagenes = req.files.upload;
  if (imagenes.length) {
    for (const imagen of imagenes) {
      var buf = Buffer.from(imagen.data, 'base64');
      await fs.writeFile(`../../var/www/html/assets/img/${subfolder}/${imagen.name}`, buf, () => {});
    }
  } else {
      var buf = Buffer.from(imagenes.data, 'base64');
      await fs.writeFile(`../../var/www/html/assets/img/${subfolder}/${imagenes.name}`, buf, () => {});
  }
  res.status(200).json({ message: 'Upload Complete'})
};

exports.deleteImage = async (req, res) => {
  const subfolder = req.params.folder;
  const image = req.params.imageName;
  fs.unlink(`./dist/assets/img/${subfolder}/${image}`, (err) => {
    if (err) {
      console.error(err)
      return
    }
  });
  res.status(200).json({ message: 'Delete Complete'})
}
