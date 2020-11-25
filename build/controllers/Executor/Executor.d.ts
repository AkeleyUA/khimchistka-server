import { Request, Response } from "express";
declare class Executor {
    add(req: Request, res: Response): Promise<Response<any> | undefined>;
    getAll(req: Request, res: Response): Promise<void>;
}
export declare const executorControler: Executor;
export {};
//# sourceMappingURL=Executor.d.ts.map