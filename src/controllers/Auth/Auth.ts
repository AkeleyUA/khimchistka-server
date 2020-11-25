import { Request, Response } from "express";
import { UserModel } from "../../schemas/User/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MailController } from "../Mail/Mail";
import gpc from "generate-pincode";

type AuthForm = { email: string; password: string };

class AuthControler {
  private transport = new MailController();
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
      const credits = Math.floor((Math.random() / 2) * 1000);
      const candidate = new UserModel({
        email: normalizeEmail,
        password: hashPassword,
        role: "user",
        credits: credits,
      });

      await candidate.save();

      const token = jwt.sign(
        { normalizeEmail, _id: candidate._id, role: candidate.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: "300h",
        }
      );
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

      const token = jwt.sign(
        { normalizeEmail, _id: find._id, role: find.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: "5000h",
        }
      );
      return res.status(200).json({ message: "Success", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Unknown server error" });
    }
  }

  public async resetPassword(req: Request, res: Response) {
    const { email } = req.body;

    if (email === "" || !Boolean(email)) {
      return res.status(400).json({ message: "Place enter email" });
    }

    const normalizeEmail = email.toLowerCase();
    const find = await UserModel.findOne({ email: normalizeEmail });

    if (!find) {
      return res.status(404).json({ message: "User doess not exists" });
    }

    const resetCode = gpc(4);
    await find.updateOne({ resetCode: resetCode });

    const message = {
      from: "khimchistkamaildemo@gmail.com",
      to: normalizeEmail,
      subject: "Reset password",
      text: `Reset code ${resetCode}`,
    };

    await this.transport.mailer(message);
    res.status(200).json({ message: "Sended email" });
  }

  public async confirmResetPassword(req: Request, res: Response) {
    const { code, email }: { code: string; email: string } = req.body;

    try {
      if (code.length !== 4) {
        return res.status(422).json({ message: "The code must be 4 digits" });
      }

      const normalizeEmail = email.toLowerCase();
      const find = await UserModel.findOne({ email: normalizeEmail });
      console.log(find);

      if (find?.resetCode !== Number(code)) {
        return res.status(401).json({ message: "Incorrect code." });
      }

      res.status(200).json({ message: "Success", confirmed: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server err" });
    }
  }

  public async newPasswordUpdate(req: Request, res: Response) {
    const {
      code,
      email,
      newPassword,
    }: { code: string; email: string; newPassword: string } = req.body;

    try {
      if (!newPassword || newPassword === "") {
        return res.status(400).json({ message: "Please enter new password" });
      }
      const normalizeEmail = email.toLowerCase();
      const find = await UserModel.findOne({ email: normalizeEmail });

      if (find?.resetCode !== Number(code)) {
        return res.status(401).json({ message: "Incorrect code." });
      }

      const hashPassword = await bcrypt.hash(newPassword, 12);
      await find.updateOne({ resetCode: null, password: hashPassword });

      res.status(200).json({ message: "Success" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server err" });
    }
  }
}

export const authControler = new AuthControler();
