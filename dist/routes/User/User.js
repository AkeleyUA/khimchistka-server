"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var User_1 = require("../../controllers/User/User");
exports.userRouter = express_1.Router({
    strict: true,
});
exports.userRouter.get("/current", function (req, res) {
    User_1.userController.getUser(req, res);
});
