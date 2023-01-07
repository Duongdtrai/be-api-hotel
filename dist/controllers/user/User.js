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
const _ = require("lodash");
const User_1 = require("../../models/user/User");
const i18n_1 = require("../../utils/i18n");
const notification = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const i18n = yield i18n_1.default.init();
    return i18n.t(key);
});
class UserController {
    getSingleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ _id: req.params.userId });
                if (!_.isEmpty(user)) {
                    res.status(200).json({ message: yield notification('success'), data: user });
                }
                else {
                    res.status(404).json(yield notification('error'));
                }
                ;
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userEdit = yield User_1.default.findOne({ _id: req.params.userId });
                if (!userEdit) {
                    const userData = yield User_1.default.updateOne({ _id: req.params.userId }, Object.assign({}, req.body), { runValidators: true });
                    res.status(200).json({ message: yield notification('success'), data: userData });
                }
                else {
                    res.status(404).json('User not found');
                }
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=User.js.map