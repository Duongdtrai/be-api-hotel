import { Router } from 'express'
import UserController from '../../controllers/user/User'
import * as passport from 'passport'
import '../../middlewares/passport'
import checkIsInRole from '../../middlewares/role'
import { CONFIG } from '../../configs/configs'
const router = Router();


/**
 * @openapi
 * /u/user/{userId}:
 *   get:
 *     tags:
 *      - "[USER]: user"
 *     summary: Thông tin user
 *     parameters:
 *      - in: "path"
 *        name: "userId"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/:userId', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.USER), UserController.getSingleUser);

/**
 * @openapi
 * /u/user/{userId}:
 *   patch:
 *     tags:
 *      - "[USER]: user"
 *     summary: Thông tin user
 *     parameters:
 *      - in: "path"
 *        name: "userId"
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin user"
 *        schema:
 *          type: "object"
 *          properties:
 *            fullName:
 *              type: "string"
 *              description: "Tên người dùng"
 *            phone:
 *              type: "string"
 *              description: "Số điện thoại người dùng"
 *            address:
 *              type: "string"
 *              description: "Địa chỉ người dùng"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.patch('/:userId', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.USER), UserController.editUser);

export default router;