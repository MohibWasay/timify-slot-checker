import { Resource, IResource } from "@app/models/Resource";
import { NextFunction, Request, Response } from "express";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resource = new Resource({
      name: req.body.name,
      slots: []
    });
    await resource.save();

    return res.send({
      success: true,
      message: 'Created new Resource'
    });
  } catch (error) {
    next(error);
  }
};

export const createBulk = (resources: IResource[]) => {
  try {
    return Resource.insertMany(resources);
  } catch (error) {
  }
};

export default {
  create,
  createBulk
};
