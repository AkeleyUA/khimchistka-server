"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executorRounter = void 0;
var express_1 = require("express");
var Executor_1 = require("../../controllers/Executor/Executor");
exports.executorRounter = express_1.Router({
    strict: true,
});
exports.executorRounter.post("/add", function (req, res) {
    Executor_1.executorControler.add(req, res);
});
exports.executorRounter.get("/all", function (req, res) {
    Executor_1.executorControler.getAll(req, res);
});
