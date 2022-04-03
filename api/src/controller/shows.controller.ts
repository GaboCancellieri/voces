import { Show } from '../schemas';
import { Request, Response } from 'express';

export const getShows = async (req: Request, res: Response) => {
  try {
    const shows = await Show.find({});
    res.json(shows);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createShow = async (req: Request, res: Response) => {
  try {
    var new_show = new Show(req.body);
    const show = await new_show.save();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getShow = async (req: Request, res: Response) => {
  try {
    const show = await Show.findById(req.params.idShow);
    res.json(show);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateShow = async (req: Request, res: Response) => {
  try {
    const show = await Show.findOneAndUpdate(
      { _id: req.params.idShow },
      req.body,
      { new: true, useFindAndModify: true }
    );
    res.json(show);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteShow = async (req: Request, res: Response) => {
  try {
    const show = await Show.remove({
      _id: req.params.idShow,
    });
    res.json(show);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
