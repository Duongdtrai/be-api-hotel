"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Account_1 = require("../controllers/Account");
const router = (0, express_1.Router)();
router.post('/login', Account_1.default.loginAccount);
router.post('/register', Account_1.default.registerAccount);
router.post('/forgot-password', Account_1.default.forgotPassword);
router.patch('/change-password', Account_1.default.changePassword);
router.get('/verify-account', Account_1.default.verifyAccount);
exports.default = router;
//# sourceMappingURL=Account.js.map