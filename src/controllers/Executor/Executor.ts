import { Request, Response } from "express";
import { ExecutorModel, ServiceType } from "../../schemas/Executor/Executor";
import { generatePriceHelper } from "./generatePriceHelper";

type ExecutorType = {
  name: string;
  description: string;
  type: string;
  images?: string[];
  serviceTypes: string[];
};

class Executor {
  public async add(req: Request, res: Response) {
    const executor: ExecutorType = req.body;
    if (
      !(
        executor?.name ||
        executor?.description ||
        executor?.type ||
        executor?.serviceTypes
      )
    ) {
      return res.status(400).json({ message: "Please add more data." });
    }

    try {
      const updateExecutor = {
        ...executor,
        serviceTypes: executor.serviceTypes.map((name) =>
          generatePriceHelper(name)
        ),
      };
      console.log(updateExecutor);
      const candidat = new ExecutorModel(updateExecutor);

      await candidat.save();
      res.status(201).json({ message: "Success" });
    } catch (err) {
      console.error(err);
    }
  }
  public async getAll(req: Request, res: Response) {
    try {
      const data = await ExecutorModel.find();
      res.status(200).json({ data });
    } catch (err) {
      console.error(err);
    }
  }
}

export const executorControler = new Executor();
