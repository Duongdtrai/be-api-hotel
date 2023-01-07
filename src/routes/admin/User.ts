import { Router } from 'express'
import UserController from '../../controllers/admin/user'
import * as passport from 'passport'
import '../../middlewares/passport'
import checkIsInRole from '../../middlewares/role'
import { CONFIG } from '../../configs/configs'
const router = Router();
/**
 * @openapi
 * /a/list-user:
 *   get:
 *     tags:
 *      - "[ADMIN]: List user"
 *     summary: Thông tin list user
 *     parameters:
 *      - in: query
 *        name: "page"
 *        description: "page"
 *        type: "number"
 *      - in: query
 *        name: "limit"
 *        description: "limit"
 *        type: "number"
 *      - in: "query"
 *        name: "freeWord"
 *        type: "string"
 *        description: "Tìm kiếm theo tên user, số điện thoại, địa chỉ"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.ADMIN), UserController.getUsers);
/**
 * @openapi
 * /a/list-user/{userId}:
 *   get:
 *     tags:
 *      - "[ADMIN]: List user"
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
router.get('/:userId', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.ADMIN), UserController.getSingleUser);

/**
 * @openapi
 * /a/list-user/{userId}:
 *   patch:
 *     tags:
 *      - "[ADMIN]: List user"
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
router.patch('/:userId', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.ADMIN), UserController.editUser);

/**
 * @openapi
 * /a/list-user/{userId}:
 *   delete:
 *     tags:
 *      - "[ADMIN]: List user"
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
router.delete('/:userId', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.ADMIN), UserController.removeUser);
export default router;