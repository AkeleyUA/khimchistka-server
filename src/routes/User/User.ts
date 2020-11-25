import { Router, Response, Request } from "express";
import { userController } from "../../controllers/User/User";

export const userRouter = Router({
  strict: true,
});

userRouter.get("/current", (req: Request, res: Response) => {
  userController.getUser(req, res);
});
