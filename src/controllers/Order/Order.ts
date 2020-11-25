import { DocumentType, ModelType } from "@typegoose/typegoose/lib/types";
import { Response, Request } from "express";
import { ExecutorModel } from "../../schemas/Executor/Executor";
import { OrderModel } from "../../schemas/Order/Order";
import { UserModel } from "../../schemas/User/User";

type updatedOrderType = {
  _id: string;
  date: Date;
  user: {
    _id: string;
    firstName: string;
    secondName: string;
    role: string;
  };
  serviceType: {
    name: string;
    price: number;
  };
  status: number;
};

class OrderController {
  public async newOrder(req: Request, res: Response) {
    try {
      const {
        creator,
        orderData,
      }: {
        creator: { id: string; firstName: string; secondName: string };
        orderData: { date: Date; executorId: string; serviceType: string };
      } = req.body;

      const find = await UserModel.findById(creator.id);

      if (!find) {
        return res.status(404).json({ message: "User does not exists" });
      }

      await find.updateOne({
        firstName: creator.firstName,
        secondName: creator.secondName,
      });

      const executor = await ExecutorModel.findById(orderData.executorId);

      if (!executor) {
        return res.status(404).json({ message: "No dry cleaner found." });
      }

      const serviceTypeFind = executor.serviceTypes.find(
        (type) => type.name === orderData.serviceType
      );

      if (!serviceTypeFind) {
        return res.status(404).json({ message: "Service is not provided." });
      }

      if (serviceTypeFind.price > find.credits) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      const newOrder = new OrderModel({
        executor: executor._id,
        serviceType: serviceTypeFind,
        user: find._id,
        status: 0,
        date: orderData.date,
      });

      await newOrder.save();
      await find.updateOne({ credits: find.credits - serviceTypeFind.price });
      res.status(200).json({ message: "Order is accepted." });
    } catch (err) {
      console.error(err);
    }
  }
  public async getAll(req: Request, res: Response) {
    const { user } = req.body;
    try {
      let orders: any = [];
      if (user.role === "admin") {
        orders = await OrderModel.find()
          .populate("user")
          .populate("executor")
          .exec();
      } else {
        orders = await OrderModel.find({ user: user._id })
          .populate("user")
          .populate("executor")
          .exec();
      }
      res.status(200).json({ data: orders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
  public async changeOrder(req: Request, res: Response) {
    try {
      const {
        updatedOrder,
        rejectReason,
      }: { updatedOrder: updatedOrderType; rejectReason: string } = req.body;

      const { user, serviceType } = updatedOrder;

      await OrderModel.findByIdAndUpdate(updatedOrder._id, {
        serviceType: serviceType,
        status: updatedOrder.status,
        rejectReason,
      });
      await UserModel.findByIdAndUpdate(user._id, {
        firstName: user.firstName,
        secondName: user.secondName,
      });

      let newData;
      if (user.role === "admin") {
        newData = await OrderModel.find()
          .populate("user")
          .populate("executor")
          .exec();
      } else {
        newData = await OrderModel.find({ user: user._id })
          .populate("user")
          .populate("executor")
          .exec();
      }
      res.status(200).json({ data: newData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
}

export const orderController = new OrderController();
