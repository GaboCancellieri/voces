import fs from 'fs';
import { Request, Response } from 'express';

export const uploadImages = async (req: Request, res: Response) => {
  try {
    const subfolder = req.params.folder;
    const imagenes: any = req.files?.upload;
    if (imagenes?.length) {
      for (const imagen of imagenes) {
        const buf = Buffer.from(imagen.data, 'base64');
        await fs.writeFile(
          `../../const/www/html/assets/img/${subfolder}/${imagen.name}`,
          buf,
          () => {}
        );
      }
    } else {
      const buf = Buffer.from(imagenes?.data, 'base64');
      await fs.writeFile(
        `../../const/www/html/assets/img/${subfolder}/${imagenes?.name}`,
        buf,
        () => {}
      );
    }
    res.status(200).json({ message: 'Upload Complete' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const subfolder = req.params.folder;
    const image = req.params.imageName;
    fs.unlink(`./dist/assets/img/${subfolder}/${image}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    res.status(200).json({ message: 'Delete Complete' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
