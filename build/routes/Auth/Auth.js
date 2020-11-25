"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = require("express");
var Auth_1 = require("../../controllers/Auth/Auth");
exports.authRouter = express_1.Router({
    strict: true,
});
exports.authRouter.post("/login", function (req, res) {
    Auth_1.authControler.login(req, res);
});
exports.authRouter.post("/register", function (req, res) {
    Auth_1.authControler.registration(req, res);
});
exports.authRouter.post("/resetPassword", function (req, res) {
    Auth_1.authControler.resetPassword(req, res);
});
exports.authRouter.post("/resetPasswordConfirm", function (req, res) {
    Auth_1.authControler.confirmResetPassword(req, res);
});
exports.authRouter.post("/updatePassword", function (req, res) {
    Auth_1.authControler.newPasswordUpdate(req, res);
});
