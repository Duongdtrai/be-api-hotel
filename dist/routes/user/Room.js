"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const Room_1 = require("../../controllers/user/Room");
require("../../middlewares/passport");
const role_1 = require("../../middlewares/role");
const configs_1 = require("../../configs/configs");
const router = (0, express_1.Router)();
router.get('/', Room_1.default.getRooms);
router.get('/:roomId', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.USER), Room_1.default.getSingleRoom);
exports.default = router;
//# sourceMappingURL=Room.js.map