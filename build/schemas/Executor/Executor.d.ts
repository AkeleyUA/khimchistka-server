export declare type ServiceType = {
    name: string;
    price: number;
};
declare class Executor {
    name: string;
    description: string;
    type: string;
    images: string[];
    serviceTypes: ServiceType[];
}
export declare const ExecutorModel: import("@typegoose/typegoose").ReturnModelType<typeof Executor, {}>;
export {};
//# sourceMappingURL=Executor.d.ts.map