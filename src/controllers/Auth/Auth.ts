import { Request, Response } from "express";
import { UserModel } from "../../schemas/User/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type AuthForm = { email: string; password: string };

class AuthControler {
  public async registration(req: Request, res: Response) {
    const { email, password }: AuthForm = req.body;

    try {
      if (!Boolean(email) || !Boolean(password)) {
        return res.status(400).json({ message: "Place enter auth data" });
      }

      const normalizeEmail = email.toLowerCase();
      const find = await UserModel.findOne({ email: normalizeEmail });

      if (find) {
        return res.status(500).json({ message: "User already exists" });
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const candidate = new UserModel({
        email: normalizeEmail,
        password: hashPassword,
        role: "user",
      });

      await candidate.save();

      const token = jwt.sign({ normalizeEmail }, process.env.JWT_SECRET!, {
        expiresIn: "300h",
      });
      return res.status(201).json({ message: "Success", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unknown server error" });
    }
  }
  public async login(req: Request, res: Response) {
    const { email, password }: AuthForm = req.body;

    try {
      if (!Boolean(email) && !Boolean(password)) {
        return res.status(400).json({ message: "Place enter auth data" });
      }

      const normalizeEmail = email.toLowerCase();
      const find = await UserModel.findOne({ email: normalizeEmail });

      if (!find) {
        return res.status(404).json({ message: "User doess not exists" });
      }

      const checkPassword = await bcrypt.compare(password, find.password);

      if (!checkPassword) {
        return res.status(400).json({ message: "User data incorrect" });
      }

      const token = jwt.sign({ normalizeEmail }, process.env.JWT_SECRET!, {
        expiresIn: "300h",
      });
      return res.status(200).json({ message: "Success", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unknown server error" });
    }
  }
}

export const authControler = new AuthControler();
