import { Imagen } from '../schemas';
import { Request, Response } from 'express';

export const getImagenes = async (req: Request, res: Response) => {
  try {
    const imagenes = Imagen.find({});
    res.json(imagenes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getImagenesTipo = async (req: Request, res: Response) => {
  try {
    const tipo = req.params.tipo;
    const imagenes = await Imagen.find({ tipo });
    res.json(imagenes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createImagen = async (req: Request, res: Response) => {
  try {
    const newImagen = new Imagen(req.body);
    const imagen = await newImagen.save();
    res.json(imagen);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getImagen = async (req: Request, res: Response) => {
  try {
    const imagen = await Imagen.findById(req.params.idImagen);
    res.json(imagen);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateImagen = async (req: Request, res: Response) => {
  try {
    const imagen = await Imagen.findOneAndUpdate(
      { _id: req.params.idImagen },
      req.body,
      { new: true, useFindAndModify: true }
    );
    res.json(imagen);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteImagen = async (req: Request, res: Response) => {
  try {
    const removedImage = await Imagen.remove({
      _id: req.params.idImagen,
    });
    res.json(removedImage);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
