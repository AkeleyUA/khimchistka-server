"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
var Executor_1 = require("../../schemas/Executor/Executor");
var Order_1 = require("../../schemas/Order/Order");
var User_1 = require("../../schemas/User/User");
var OrderController = /** @class */ (function () {
    function OrderController() {
    }
    OrderController.prototype.newOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, creator, orderData_1, find, executor, serviceTypeFind, newOrder, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = req.body, creator = _a.creator, orderData_1 = _a.orderData;
                        return [4 /*yield*/, User_1.UserModel.findById(creator.id)];
                    case 1:
                        find = _b.sent();
                        if (!find) {
                            return [2 /*return*/, res.status(404).json({ message: "User does not exists" })];
                        }
                        return [4 /*yield*/, find.updateOne({
                                firstName: creator.firstName,
                                secondName: creator.secondName,
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, Executor_1.ExecutorModel.findById(orderData_1.executorId)];
                    case 3:
                        executor = _b.sent();
                        if (!executor) {
                            return [2 /*return*/, res.status(404).json({ message: "No dry cleaner found." })];
                        }
                        serviceTypeFind = executor.serviceTypes.find(function (type) { return type.name === orderData_1.serviceType; });
                        if (!serviceTypeFind) {
                            return [2 /*return*/, res.status(404).json({ message: "Service is not provided." })];
                        }
                        if (serviceTypeFind.price > find.credits) {
                            return [2 /*return*/, res.status(400).json({ message: "Insufficient funds" })];
                        }
                        newOrder = new Order_1.OrderModel({
                            executor: executor._id,
                            serviceType: serviceTypeFind,
                            user: find._id,
                            status: 0,
                            date: orderData_1.date,
                        });
                        return [4 /*yield*/, newOrder.save()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, find.updateOne({ credits: find.credits - serviceTypeFind.price })];
                    case 5:
                        _b.sent();
                        res.status(200).json({ message: "Order is accepted." });
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _b.sent();
                        console.error(err_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, orders, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.body.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        orders = [];
                        if (!(user.role === "admin")) return [3 /*break*/, 3];
                        return [4 /*yield*/, Order_1.OrderModel.find()
                                .populate("user")
                                .populate("executor")
                                .exec()];
                    case 2:
                        orders = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, Order_1.OrderModel.find({ user: user._id })
                            .populate("user")
                            .populate("executor")
                            .exec()];
                    case 4:
                        orders = _a.sent();
                        _a.label = 5;
                    case 5:
                        res.status(200).json({ data: orders });
                        return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        console.error(err_2);
                        res.status(500).json({ message: "Server error" });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.changeOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, updatedOrder, rejectReason, user, serviceType, newData, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = req.body, updatedOrder = _a.updatedOrder, rejectReason = _a.rejectReason;
                        user = updatedOrder.user, serviceType = updatedOrder.serviceType;
                        return [4 /*yield*/, Order_1.OrderModel.findByIdAndUpdate(updatedOrder._id, {
                                serviceType: serviceType,
                                status: updatedOrder.status,
                                rejectReason: rejectReason,
                            })];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, User_1.UserModel.findByIdAndUpdate(user._id, {
                                firstName: user.firstName,
                                secondName: user.secondName,
                            })];
                    case 2:
                        _b.sent();
                        newData = void 0;
                        if (!(user.role === "admin")) return [3 /*break*/, 4];
                        return [4 /*yield*/, Order_1.OrderModel.find()
                                .populate("user")
                                .populate("executor")
                                .exec()];
                    case 3:
                        newData = _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, Order_1.OrderModel.find({ user: user._id })
                            .populate("user")
                            .populate("executor")
                            .exec()];
                    case 5:
                        newData = _b.sent();
                        _b.label = 6;
                    case 6:
                        res.status(200).json({ data: newData });
                        return [3 /*break*/, 8];
                    case 7:
                        err_3 = _b.sent();
                        console.error(err_3);
                        res.status(500).json({ message: "Server error" });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return OrderController;
}());
exports.orderController = new OrderController();
