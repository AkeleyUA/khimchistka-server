"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePriceHelper = void 0;
var generatePriceHelper = function (name) {
    var price = Math.round((Math.random() / 2) * 1000);
    return { name: name, price: price };
};
exports.generatePriceHelper = generatePriceHelper;
