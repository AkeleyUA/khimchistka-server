import { Router, Response, Request } from "express";
import { orderController } from "../../controllers/Order/Order";

export const orderRounter = Router({
  strict: true,
});

orderRounter.post("/create", (req: Request, res: Response) => {
  orderController.newOrder(req, res);
});

orderRounter.get("/all", (req: Request, res: Response) => {
  orderController.getAll(req, res);
});

orderRounter.put("/changeOrder", (req: Request, res: Response) => {
  orderController.changeOrder(req, res);
});
