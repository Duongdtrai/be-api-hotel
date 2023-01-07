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
Object.defineProperty(exports, "__esModule", { value: true });
const locales = () => __awaiter(void 0, void 0, void 0, function* () {
    const english = yield Promise.resolve().then(() => require('../locales/en/english.json'));
    const vietnam = yield Promise.resolve().then(() => require('../locales/vi/vietnam.json'));
    return { english, vietnam };
});
exports.default = locales;
//# sourceMappingURL=index.js.map