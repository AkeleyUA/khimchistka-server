import { Request, Router, Response } from "express";
import { authControler } from "../../controllers/Auth/Auth";

export const authRouter = Router({
  strict: true,
});

authRouter.post("/login", (req: Request, res: Response) => {
  authControler.login(req, res);
});

authRouter.post("/register", (req: Request, res: Response) => {
  authControler.registration(req, res);
});
