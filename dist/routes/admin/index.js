"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Room_1 = require("./Room");
const User_1 = require("./User");
const router = (0, express_1.Router)();
router.use('/list-user', User_1.default);
router.use('/room', Room_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map