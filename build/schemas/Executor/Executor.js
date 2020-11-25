"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutorModel = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var Executor = /** @class */ (function () {
    function Executor() {
    }
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Executor.prototype, "name", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Executor.prototype, "description", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Executor.prototype, "type", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Array)
    ], Executor.prototype, "images", void 0);
    __decorate([
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Array)
    ], Executor.prototype, "serviceTypes", void 0);
    return Executor;
}());
exports.ExecutorModel = typegoose_1.getModelForClass(Executor);
