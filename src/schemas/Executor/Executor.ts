import { prop, getModelForClass } from "@typegoose/typegoose";

export type ServiceType = {
  name: string;
  price: number;
};

class Executor {
  @prop({ required: true })
  public name!: string;
  @prop({ required: true })
  public description!: string;
  @prop({ required: true })
  public type!: string;
  @prop({ required: true })
  public images!: string[];
  @prop({ required: true })
  public serviceTypes!: ServiceType[];
}

export const ExecutorModel = getModelForClass(Executor);
