import { Institucional, EquipoDocente } from '../schemas';
import { Request, Response } from 'express';

export const getInstitucional = async (req: Request, res: Response) => {
  try {
    const institucional = await Institucional.find({});
    const equipo = await EquipoDocente.find({});
    res.json([
      {
        _id: institucional[0]?._id,
        historia: institucional[0]?.historia,
        proyecto: institucional[0]?.proyecto,
        docentes: equipo,
      },
    ]);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateInstitucional = async (req: Request, res: Response) => {
  try {
    const institucional = await Institucional.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: false,
      }
    );
    res.json(institucional);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
