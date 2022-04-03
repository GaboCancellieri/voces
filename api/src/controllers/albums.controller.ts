import fs from 'fs';
import { Request, Response } from 'express';
import { Album } from '../schemas';

export const getAlbums = async (req: Request, res: Response) => {
  const albums = await Album.find({});
  res.json(albums);
};

export const createAlbum = async (req: Request, res: Response) => {
  const newAlbum = new Album(req.body);
  const savedAlbum = await newAlbum.save();
  res.json(savedAlbum);
};

export const getAlbum = async (req: Request, res: Response) => {
  const album = await Album.findById(req.params.idAlbum);
  res.json(album);
};

export const updateAlbum = async (req: Request, res: Response) => {
  const album = await Album.findOneAndUpdate(
    { _id: req.params.idAlbum },
    req.body,
    { new: true, useFindAndModify: true }
  );
  res.json(album);
};

export const deleteAlbum = async (req: Request, res: Response) => {
  try {
    const idAlbum = req.params.idAlbum;
    const album = await Album.findOne({ _id: idAlbum });
    if (!album) return;
    for (const image of album.imagenes) {
      fs.unlink(`./dist/assets/img/galeria/${image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
    const removedAlbum = await Album.remove({
      _id: req.params.idAlbum,
    });
    res.json(removedAlbum);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
