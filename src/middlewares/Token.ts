import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// normalizeEmail

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

export const checkTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = String(
    req.headers["x-access-token"] || req.headers["authorization"]
  );
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const secret: string = process.env.JWT_SECRET as string;
    req.body.user = jwt.verify(token, secret);
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
};
