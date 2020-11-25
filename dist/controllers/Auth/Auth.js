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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControler = void 0;
var User_1 = require("../../schemas/User/User");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Mail_1 = require("../Mail/Mail");
var generate_pincode_1 = __importDefault(require("generate-pincode"));
var AuthControler = /** @class */ (function () {
    function AuthControler() {
        this.transport = new Mail_1.MailController();
    }
    AuthControler.prototype.registration = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, normalizeEmail, find, hashPassword, credits, candidate, token, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        if (!Boolean(email) || !Boolean(password)) {
                            return [2 /*return*/, res.status(400).json({ message: "Place enter auth data" })];
                        }
                        normalizeEmail = email.toLowerCase();
                        return [4 /*yield*/, User_1.UserModel.findOne({ email: normalizeEmail })];
                    case 2:
                        find = _b.sent();
                        if (find) {
                            return [2 /*return*/, res.status(500).json({ message: "User already exists" })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 12)];
                    case 3:
                        hashPassword = _b.sent();
                        credits = Math.floor((Math.random() / 2) * 1000);
                        candidate = new User_1.UserModel({
                            email: normalizeEmail,
                            password: hashPassword,
                            role: "user",
                            credits: credits,
                        });
                        return [4 /*yield*/, candidate.save()];
                    case 4:
                        _b.sent();
                        token = jsonwebtoken_1.default.sign({ normalizeEmail: normalizeEmail, _id: candidate._id, role: candidate.role }, process.env.JWT_SECRET, {
                            expiresIn: "300h",
                        });
                        return [2 /*return*/, res.status(201).json({ message: "Success", token: token })];
                    case 5:
                        err_1 = _b.sent();
                        console.error(err_1);
                        res.status(500).json({ message: "Unknown server error" });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthControler.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, normalizeEmail, find, checkPassword, token, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        if (!Boolean(email) && !Boolean(password)) {
                            return [2 /*return*/, res.status(400).json({ message: "Place enter auth data" })];
                        }
                        normalizeEmail = email.toLowerCase();
                        return [4 /*yield*/, User_1.UserModel.findOne({ email: normalizeEmail })];
                    case 2:
                        find = _b.sent();
                        if (!find) {
                            return [2 /*return*/, res.status(404).json({ message: "User doess not exists" })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, find.password)];
                    case 3:
                        checkPassword = _b.sent();
                        if (!checkPassword) {
                            return [2 /*return*/, res.status(400).json({ message: "User data incorrect" })];
                        }
                        token = jsonwebtoken_1.default.sign({ normalizeEmail: normalizeEmail, _id: find._id, role: find.role }, process.env.JWT_SECRET, {
                            expiresIn: "5000h",
                        });
                        return [2 /*return*/, res.status(200).json({ message: "Success", token: token })];
                    case 4:
                        err_2 = _b.sent();
                        console.error(err_2);
                        res.status(500).json({ message: "Unknown server error" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthControler.prototype.resetPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, normalizeEmail, find, resetCode, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        if (email === "" || !Boolean(email)) {
                            return [2 /*return*/, res.status(400).json({ message: "Place enter email" })];
                        }
                        normalizeEmail = email.toLowerCase();
                        return [4 /*yield*/, User_1.UserModel.findOne({ email: normalizeEmail })];
                    case 1:
                        find = _a.sent();
                        if (!find) {
                            return [2 /*return*/, res.status(404).json({ message: "User doess not exists" })];
                        }
                        resetCode = generate_pincode_1.default(4);
                        return [4 /*yield*/, find.updateOne({ resetCode: resetCode })];
                    case 2:
                        _a.sent();
                        message = {
                            from: "khimchistkamaildemo@gmail.com",
                            to: normalizeEmail,
                            subject: "Reset password",
                            text: "Reset code " + resetCode,
                        };
                        return [4 /*yield*/, this.transport.mailer(message)];
                    case 3:
                        _a.sent();
                        res.status(200).json({ message: "Sended email" });
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthControler.prototype.confirmResetPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, email, normalizeEmail, find, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, code = _a.code, email = _a.email;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        if (code.length !== 4) {
                            return [2 /*return*/, res.status(422).json({ message: "The code must be 4 digits" })];
                        }
                        normalizeEmail = email.toLowerCase();
                        return [4 /*yield*/, User_1.UserModel.findOne({ email: normalizeEmail })];
                    case 2:
                        find = _b.sent();
                        console.log(find);
                        if ((find === null || find === void 0 ? void 0 : find.resetCode) !== Number(code)) {
                            return [2 /*return*/, res.status(401).json({ message: "Incorrect code." })];
                        }
                        res.status(200).json({ message: "Success", confirmed: true });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _b.sent();
                        console.error(err_3);
                        res.status(500).json({ message: "Server err" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthControler.prototype.newPasswordUpdate = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, email, newPassword, normalizeEmail, find, hashPassword, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, code = _a.code, email = _a.email, newPassword = _a.newPassword;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        if (!newPassword || newPassword === "") {
                            return [2 /*return*/, res.status(400).json({ message: "Please enter new password" })];
                        }
                        normalizeEmail = email.toLowerCase();
                        return [4 /*yield*/, User_1.UserModel.findOne({ email: normalizeEmail })];
                    case 2:
                        find = _b.sent();
                        if ((find === null || find === void 0 ? void 0 : find.resetCode) !== Number(code)) {
                            return [2 /*return*/, res.status(401).json({ message: "Incorrect code." })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(newPassword, 12)];
                    case 3:
                        hashPassword = _b.sent();
                        return [4 /*yield*/, find.updateOne({ resetCode: null, password: hashPassword })];
                    case 4:
                        _b.sent();
                        res.status(200).json({ message: "Success" });
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _b.sent();
                        console.error(err_4);
                        res.status(500).json({ message: "Server err" });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return AuthControler;
}());
exports.authControler = new AuthControler();
