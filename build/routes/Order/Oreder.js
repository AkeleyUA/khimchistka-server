"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRounter = void 0;
var express_1 = require("express");
var Order_1 = require("../../controllers/Order/Order");
exports.orderRounter = express_1.Router({
    strict: true,
});
exports.orderRounter.post("/create", function (req, res) {
    Order_1.orderController.newOrder(req, res);
});
exports.orderRounter.get("/all", function (req, res) {
    Order_1.orderController.getAll(req, res);
});
exports.orderRounter.put("/changeOrder", function (req, res) {
    Order_1.orderController.changeOrder(req, res);
});
