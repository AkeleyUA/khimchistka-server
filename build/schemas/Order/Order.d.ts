export declare type ServiceType = {
    name: string;
    price: number;
};
declare class Order {
    executor: string;
    serviceType: ServiceType;
    user: string;
    status: number;
    date: Date;
    rejectReason?: string;
}
export declare const OrderModel: import("@typegoose/typegoose").ReturnModelType<typeof Order, {}>;
export {};
//# sourceMappingURL=Order.d.ts.map