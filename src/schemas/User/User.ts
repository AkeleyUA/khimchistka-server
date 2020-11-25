import { prop, getModelForClass } from "@typegoose/typegoose";

type Role = "admin" | "user";

class User {
  @prop({ unique: true, required: true })
  public email!: string;
  @prop({ type: String, required: true })
  public role!: Role;
  @prop({ required: true })
  public password!: string;
  @prop({ type: Number })
  public resetCode: number | undefined;
  @prop({ type: Number, required: true })
  public credits!: number;
  @prop()
  public firstName?: string;
  @prop()
  public secondName?: string;
}

export const UserModel = getModelForClass(User);
