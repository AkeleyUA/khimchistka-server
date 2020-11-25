import { Response, Request } from "express";
export declare type User = {
    firstName?: string;
    secondName?: string;
    id: string;
    email: string;
    credits: number;
    role: "user" | "admin";
};
declare class UserController {
    getUser(req: Request, res: Response): Promise<Response<any> | undefined>;
}
export declare const userController: UserController;
export {};
//# sourceMappingURL=User.d.ts.map