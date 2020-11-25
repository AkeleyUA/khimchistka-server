import { prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

export type ServiceType = {
  name: string;
  price: number;
};

class Order {
  @prop({ type: mongoose.Types.ObjectId, required: true, ref: "Executor" })
  public executor!: string;
  @prop({ required: true })
  public serviceType!: ServiceType;
  @prop({ type: mongoose.Types.ObjectId, required: true, ref: "User" })
  public user!: string;
  @prop({ required: true })
  public status!: number;
  @prop({ type: Date, required: true })
  public date!: Date;
  @prop()
  public rejectReason?: string;
}

export const OrderModel = getModelForClass(Order);
