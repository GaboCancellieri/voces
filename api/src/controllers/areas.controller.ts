import fs from 'fs';
import { Request, Response } from 'express';
import { Area } from '../schemas';

export const getAreas = async (req: Request, res: Response) => {
  const areas = await Area.find({});
  res.json(areas);
};

export const createArea = async (req: Request, res: Response) => {
  var newArea = new Area(req.body);
  const savedArea = await newArea.save();
  res.json(savedArea);
};

export const getArea = async (req: Request, res: Response) => {
  const area = await Area.findById(req.params.idArea);
  res.json(area);
};

export const updateArea = async (req: Request, res: Response) => {
  const area = await Area.findOneAndUpdate(
    { _id: req.params.idArea },
    req.body,
    { new: true, useFindAndModify: true }
  );
  res.json(area);
};

export const deleteArea = async (req: Request, res: Response) => {
  const idArea = req.params.idArea;
  const area = await Area.findOne({ _id: idArea });
  if (!area) return;
  for (const image of area.imagenes) {
    fs.unlink(`./dist/assets/img/areas/${image}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
  const removedArea = await Area.remove({
    _id: idArea,
  });
  res.json(removedArea);
};
