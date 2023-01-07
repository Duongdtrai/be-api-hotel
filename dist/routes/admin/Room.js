"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const Room_1 = require("../../controllers/admin/Room");
require("../../middlewares/passport");
const role_1 = require("../../middlewares/role");
const configs_1 = require("../../configs/configs");
const router = (0, express_1.Router)();
router.get('/', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.ADMIN), Room_1.default.getRooms);
router.get('/:roomId', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.ADMIN), Room_1.default.getSingleRoom);
router.post('/create', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.ADMIN), Room_1.default.createRoom);
router.delete('/:roomId', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.ADMIN), Room_1.default.removeRoom);
exports.default = router;
//# sourceMappingURL=Room.js.map