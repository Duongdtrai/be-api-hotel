"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const RentRoom_1 = require("../../controllers/user/RentRoom");
require("../../middlewares/passport");
const role_1 = require("../../middlewares/role");
const configs_1 = require("../../configs/configs");
const router = (0, express_1.Router)();
router.get('/', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.USER), RentRoom_1.default.getListRentRooms);
router.post('/order', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.USER), RentRoom_1.default.orderRentRoom);
router.patch('/:rentRoomId', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.USER), RentRoom_1.default.changeRentRoom);
router.patch('/:rentRoomId', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.USER), RentRoom_1.default.removeRentRoom);
exports.default = router;
//# sourceMappingURL=RentRoom.js.map