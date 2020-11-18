import { Request, Router, Response } from "express";
import { userController } from "../../controllers/User/User";

export const userRouter = Router({
  strict: true,
});

userRouter.post("/", (req: Request, res: Response) => {
  userController.create(req, res);
});

userRouter.get("/", (req: Request, res: Response) => {
  userController.read(req, res);
});

userRouter.patch("/", (req: Request, res: Response) => {
  userController.upadte(req, res);
});

userRouter.delete("/", (req: Request, res: Response) => {
  userController.delete(req, res);
});
