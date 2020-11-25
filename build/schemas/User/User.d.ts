declare type Role = "admin" | "user";
declare class User {
    email: string;
    role: Role;
    password: string;
    resetCode: number | undefined;
    credits: number;
    firstName?: string;
    secondName?: string;
}
export declare const UserModel: import("@typegoose/typegoose").ReturnModelType<typeof User, {}>;
export {};
//# sourceMappingURL=User.d.ts.map