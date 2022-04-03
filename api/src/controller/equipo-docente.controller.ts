import fs from 'fs';
import { EquipoDocente } from '../schemas';
import { Request, Response } from 'express';

export const getEquipo = async (req: Request, res: Response) => {
  try {
    const equipo = await EquipoDocente.find({});
    res.json(equipo[0]);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateEquipo = async (req: Request, res: Response) => {
  try {
    const equipo = await EquipoDocente.findOneAndUpdate(
      { _id: req.params.idEquipo },
      req.body,
      { new: true, useFindAndModify: true }
    );
    res.json(equipo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createEquipo = async (req: Request, res: Response) => {
  try {
    const newEquipo = new EquipoDocente(req.body);
    const equipo = await newEquipo.save();
    res.json(equipo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEquipo = async (req: Request, res: Response) => {
  try {
    const idEquipo = req.params.idEquipo;
    const equipo = await EquipoDocente.findOne({ _id: idEquipo });
    if (equipo?.imagen) {
      fs.unlink(`./dist/assets/img/docentes/${equipo.imagen}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }

    const removedEquipo = await EquipoDocente.remove({
      _id: idEquipo,
    });
    res.json(removedEquipo);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
