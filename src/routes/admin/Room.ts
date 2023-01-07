import { Router } from 'express'
import RoomController from '../../controllers/admin/Room'
import * as passport from 'passport'
import '../../middlewares/passport'
import checkIsInRole from '../../middlewares/role'
import { CONFIG } from '../../configs/configs'

const router = Router();
/**
 * @openapi
 * /a/room:
 *   get:
 *     tags:
 *      - "[ADMIN]: room"
 *     summary: Thông tin user
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
 *        description: "tìm kiếm theo tên phòng"
 *      - in: query
 *        name: "priceStart"
 *        description: "priceStart"
 *        type: "number"
 *      - in: query
 *        name: "priceEnd"
 *        description: "priceEnd"
 *        type: "number"
 *      - in: query
 *        name: "type"
 *        description: "type"
 *        type: "string"
 *        enum:
 *        - all
 *        - home
 *        - community
 *        - product
 *        - service
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.ADMIN), RoomController.getRooms);
/**
 * @openapi
 * /a/room/{roomId}:
 *   get:
 *     tags:
 *      - "[ADMIN]: room"
 *     summary: Thông tin user
 *     parameters:
 *      - in: "path"
 *        name: "roomId"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/:roomId', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.ADMIN), RoomController.getSingleRoom);

/**
 * @openapi
 * /a/room/create:
 *   post:
 *     tags:
 *      - "[ADMIN]: room"
 *     summary: Thông tin user
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm phòng"
 *        schema:
 *          type: "object"
 *          properties:
 *            avatar:
 *              type: "array"
 *              items:
 *                  type: string
 *              description: "Tên người dùng"
 *            title:
 *              type: "string"
 *              description: "Email người dùng"
 *            description:
 *              type: "string"
 *              description: "duong dan anh"
 *            price:
 *              type: "number"
 *              description: "Số điện thoại người dùng"
 *            bed:
 *              type: "string"
 *              description: "số giường"
 *            size:
 *              type: "number"
 *              description: "size phòng"
 *            type:
 *              type: "string"
 *              description: "Địa chỉ người dùng"
 *            service:
 *              type: "array"
 *              items:
 *                  type: string
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/create', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.ADMIN), RoomController.createRoom);


/**
 * @openapi
 * /a/room/{roomId}:
 *   patch:
 *     tags:
 *      - "[ADMIN]: room"
 *     summary: Thông tin user
 *     parameters:
 *      - in: "path"
 *        name: "roomId"
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin thêm phòng"
 *        schema:
 *          type: "object"
 *          properties:
 *            avatar:
 *              type: "array"
 *              items:
 *                  type: string
 *              description: "Tên người dùng"
 *            title:
 *              type: "string"
 *              description: "Email người dùng"
 *            description:
 *              type: "string"
 *              description: "duong dan anh"
 *            price:
 *              type: "number"
 *              description: "Số điện thoại người dùng"
 *            bed:
 *              type: "string"
 *              description: "số giường"
 *            size:
 *              type: "number"
 *              description: "size phòng"
 *            type:
 *              type: "string"
 *              description: "Địa chỉ người dùng"
 *            service:
 *              type: "array"
 *              items:
 *                  type: string
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
// router.patch('/:userId', passport.authenticate('jwt', { session: false }), RoomController.editUser);

/**
 * @openapi
 * /a/room/{roomId}:
 *   delete:
 *     tags:
 *      - "[ADMIN]: room"
 *     summary: Thông tin user
 *     parameters:
 *      - in: "path"
 *        name: "roomId"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.delete('/:roomId', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.ADMIN), RoomController.removeRoom);
export default router;