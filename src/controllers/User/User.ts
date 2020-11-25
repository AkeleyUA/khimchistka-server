import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../schemas/User/User";

export type User = {
  firstName?: string;
  secondName?: string;
  id: string;
  email: string;
  credits: number;
  role: "user" | "admin";
};

class UserController {
  public async getUser(req: Request, res: Response) {
    const { user } = req.body;

    const find = await UserModel.findOne({ email: user.normalizeEmail });

    if (!find) {
      return res.status(404).json({ message: "User does not exists" });
    }
    const { _id, email, role, credits } = find;

    res.status(200).json({
      _id,
      email,
      role,
      credits,
      firstName: find?.firstName || "",
      secondName: find?.secondName || "",
    });
  }
}

export const userController = new UserController();
