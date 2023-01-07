"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const User_1 = require("../../controllers/admin/User");
require("../../middlewares/passport");
const role_1 = require("../../middlewares/role");
const configs_1 = require("../../configs/configs");
const router = (0, express_1.Router)();
router.get('/', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.ADMIN), User_1.default.getUsers);
router.get('/:userId', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.ADMIN), User_1.default.getSingleUser);
router.patch('/:userId', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.ADMIN), User_1.default.editUser);
router.delete('/:userId', passport.authenticate('jwt', { session: false }), (0, role_1.default)(configs_1.CONFIG.role.ADMIN), User_1.default.removeUser);
exports.default = router;
//# sourceMappingURL=User.js.map