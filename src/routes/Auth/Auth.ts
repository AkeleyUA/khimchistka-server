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

authRouter.post("/resetPassword", (req: Request, res: Response) => {
  authControler.resetPassword(req, res);
});

authRouter.post("/resetPasswordConfirm", (req: Request, res: Response) => {
  authControler.confirmResetPassword(req, res);
});

authRouter.post("/updatePassword", (req: Request, res: Response) => {
  authControler.newPasswordUpdate(req, res);
});
