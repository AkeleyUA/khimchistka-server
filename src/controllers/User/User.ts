import { Request, Response } from "express";

class UserController {
  public create(req: Request, res: Response) {
    throw new Error("Method no implemedted");
  }
  public read(req: Request, res: Response) {
    res.json({ message: "ready to use" });
  }
  public upadte(req: Request, res: Response) {
    throw new Error("Method no implemedted");
  }
  public delete(req: Request, res: Response) {
    throw new Error("Method no implemedted");
  }
}

export const userController = new UserController();
