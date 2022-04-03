import fs from 'fs';
import { Request, Response } from 'express';
import { Actividad } from '../schemas';
import { IActividad } from '../interfaces';

export const getActividades = async (req: Request, res: Response) => {
  const actividades = await Actividad.find();
  res.json(actividades);
};

export const createActividad = async (req: Request, res: Response) => {
  var new_actividad = new Actividad(req.body);
  const actividad: IActividad = await new_actividad.save();
  res.json(actividad);
};

export const getActividad = async (req: Request, res: Response) => {
  const actividad = await Actividad.findById(req.params.idActividad);
  res.json(actividad);
};

export const updateActividad = (req: Request, res: Response) => {
  const actividad = Actividad.findOneAndUpdate(
    { _id: req.params.idActividad },
    req.body,
    { new: true, useFindAndModify: true }
  );
  res.json(actividad);
};

export const deleteActividad = async (req: Request, res: Response) => {
  const idActividad = req.params.idActividad;
  const actividad = await Actividad.findOne({ _id: idActividad });
  if (actividad && actividad.imagen) {
    fs.unlink(`./dist/assets/img/actividades/${actividad.imagen}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }

  const result = await Actividad.remove({ _id: idActividad });
  res.json(result);
};
