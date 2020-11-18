import { prop, getModelForClass } from "@typegoose/typegoose";

type Role = "admin" | "user";

class User {
  @prop({ unique: true, required: true })
  public email!: string;
  @prop({ type: String, required: true })
  public role!: Role;
  @prop({ required: true })
  public password!: string;
}

export const UserModel = getModelForClass(User);
