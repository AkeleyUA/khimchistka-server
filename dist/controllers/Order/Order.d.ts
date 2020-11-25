import { Response, Request } from "express";
declare class OrderController {
    newOrder(req: Request, res: Response): Promise<Response<any> | undefined>;
    getAll(req: Request, res: Response): Promise<void>;
    changeOrder(req: Request, res: Response): Promise<void>;
}
export declare const orderController: OrderController;
export {};
//# sourceMappingURL=Order.d.ts.map