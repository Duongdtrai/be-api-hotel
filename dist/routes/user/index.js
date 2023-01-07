"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("./User");
const Room_1 = require("./Room");
const RentRoom_1 = require("./RentRoom");
const router = (0, express_1.Router)();
router.use('/user', User_1.default);
router.use('/room', Room_1.default);
router.use('/rent-room', RentRoom_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map