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
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const User_1 = require("../models/user/User");
const Account_1 = require("../models/Account");
const i18n_1 = require("../utils/i18n");
const mailer_1 = require("../utils/mailer");
const notification = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const i18n = yield i18n_1.default.init();
    return i18n.t(key);
});
class AccountController {
    loginAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bodyUser = req.body;
            try {
                const userAccount = yield Account_1.default.findOne({ email: bodyUser.email });
                console.log(userAccount);
                if (!_.isEmpty(userAccount)) {
                    const checkPassword = yield bcrypt.compareSync(String(bodyUser.password), userAccount.password);
                    console.log(checkPassword);
                    if (checkPassword) {
                        const token = jwt.sign({ id: userAccount.id, role: userAccount.role }, process.env.SECRET_OR_KEY);
                        console.log(token);
                        res.status(200).json({ message: yield notification('success'), token });
                    }
                    else {
                        res.status(404).json(yield notification('validatorPassword'));
                    }
                }
                else {
                    res.status(404).json(yield notification('validatorEmail'));
                }
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
    registerAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bodyUser = req.body;
            console.log(bodyUser);
            try {
                const userAccount = yield Account_1.default.findOne({ email: bodyUser.email });
                console.log(userAccount);
                if (_.isEmpty(userAccount)) {
                    const salt = yield bcrypt.genSaltSync(10);
                    const password = yield bcrypt.hashSync(String(bodyUser.password), salt);
                    delete bodyUser.password;
                    const newUser = yield User_1.default.create(Object.assign(Object.assign({}, bodyUser), { status: 'inactive', role: 'user' }));
                    console.log(newUser);
                    yield Account_1.default.create({
                        id: newUser._id,
                        email: bodyUser.email,
                        password,
                        role: 'user',
                    });
                    res.status(200).json({ message: yield notification('success'), data: newUser });
                }
                else {
                    res.status(404).json(yield notification('validatorEmail'));
                }
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userAccount = yield Account_1.default.findOne({ id: req.query.id });
                console.log(userAccount);
                const checkPassword = yield bcrypt.compareSync(String(req.body.password), userAccount.password);
                if (checkPassword) {
                    const salt = yield bcrypt.genSaltSync(10);
                    const password = yield bcrypt.hashSync(String(req.body.newPassword), salt);
                    yield Account_1.default.updateOne({ id: req.query.id }, { password });
                    res.status(200).json({ message: yield notification('success') });
                }
                else {
                    res.status(404).json(yield notification('validatorPassword'));
                }
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.body.email) {
                res.redirect('/login');
            }
            else {
                try {
                    const account = yield Account_1.default.findOne({ email: req.body.email });
                    if (_.isEmpty(account.email)) {
                        res.redirect('/login');
                    }
                    else {
                        const token = yield jwt.sign({ _id: account._id }, process.env.SECRET_OR_KEY);
                        yield Account_1.default.updateOne({ _id: account._id }, { resetPasswordToken: token });
                        (0, mailer_1.default)(account.email, 'Forgot password', `<a href="${process.env.APP_URL}/forgot-password/?token=${token}">Reset Password</a>`);
                        res.status(200).json({ message: yield notification('success'), data: token });
                    }
                }
                catch (error) {
                    res.status(500).json(yield notification('errorServer'));
                }
            }
        });
    }
    verifyAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.query.token;
                const tokenData = jwt.verify(token, process.env.SECRET_OR_KEY);
                const account = yield Account_1.default.findOne({ _id: tokenData._id });
                if (_.isEmpty(account)) {
                    res.redirect('/login');
                }
                else {
                    if (token === account.resetPasswordToken) {
                        const salt = yield bcrypt.genSaltSync(10);
                        const password = yield bcrypt.hashSync(String(req.body.password), salt);
                        const responsePassword = yield Account_1.default.updateOne({ _id: account._id }, { resetPasswordToken: new Date(), password });
                        res.status(200).json({ message: yield notification('success'), data: responsePassword });
                    }
                    else {
                        res.redirect('/login');
                    }
                }
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
}
exports.default = new AccountController();
//# sourceMappingURL=Account.js.map