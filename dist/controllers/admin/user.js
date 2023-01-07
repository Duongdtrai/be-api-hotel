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
const i18n_1 = require("../../utils/i18n");
const User_1 = require("../../models/user/User");
const Account_1 = require("../../models/Account");
const notification = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const i18n = yield i18n_1.default.init();
    return i18n.t(key);
});
class UserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = req.query.limit ? Number(req.query.limit) : 12;
            const page = req.query.page ? Number(req.query.page) : 1;
            try {
                const totalUser = yield User_1.default.find().count();
                const users = yield User_1.default.find({
                    $or: [
                        { fullName: req.query.freeWord ? { $regex: req.query.freeWord } : { $exists: true } },
                        { address: req.query.freeWord ? { $regex: req.query.freeWord } : { $exists: true } },
                        { phone: req.query.freeWord ? { $regex: req.query.freeWord } : { $exists: true } },
                    ],
                    page: req.query.page ? req.query.page : '1',
                    limit: req.query.limit ? req.query.limit : '12',
                }).skip(limit * (page - 1)).limit(limit);
                res.status(200).json({
                    message: yield notification('success'),
                    data: users,
                    pagination: {
                        page,
                        limit,
                        total: totalUser,
                    },
                });
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
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
                if (!_.isEmpty(userEdit)) {
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
    removeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_1.default.remove({ _id: req.params.userId });
                yield Account_1.default.remove({ id: req.params.userId });
                res.status(200).json(yield notification('success'));
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=User.js.map