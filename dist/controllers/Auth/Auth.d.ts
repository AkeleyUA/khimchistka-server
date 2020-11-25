import { Request, Response } from "express";
declare class AuthControler {
    private transport;
    registration(req: Request, res: Response): Promise<Response<any> | undefined>;
    login(req: Request, res: Response): Promise<Response<any> | undefined>;
    resetPassword(req: Request, res: Response): Promise<Response<any> | undefined>;
    confirmResetPassword(req: Request, res: Response): Promise<Response<any> | undefined>;
    newPasswordUpdate(req: Request, res: Response): Promise<Response<any> | undefined>;
}
export declare const authControler: AuthControler;
export {};
//# sourceMappingURL=Auth.d.ts.map