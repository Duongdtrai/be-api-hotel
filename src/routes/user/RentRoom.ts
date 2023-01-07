import { Router } from 'express'
import RentRoomUserController from '../../controllers/user/RentRoom'
import * as passport from 'passport'
import '../../middlewares/passport'
import checkIsInRole from '../../middlewares/role'
import { CONFIG } from '../../configs/configs'
const router = Router();
/**
 * @openapi
 * /u/rent-room:
 *   get:
 *     tags:
 *      - "[USER]: Rent-Room"
 *     summary: Thông tin order room
 *     parameters:
 *      - in: "query"
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
router.get('/', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.USER), RentRoomUserController.getListRentRooms);

/**
 * @openapi
 * /u/rent-room/order:
 *   post:
 *     tags:
 *      - "[USER]: Rent-Room"
 *     summary: Đặt phòng
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin order room"
 *        schema:
 *          type: "object"
 *          properties:
 *            roomId:
 *              type: "string"
 *              description: "roomId"
 *            userId:
 *              type: "string"
 *              description: "userId"
 *            identityCard:
 *              type: "string"
 *              description: "identityCard"
 *            note:
 *              type: "string"
 *              description: "note"
 *            startDate:
 *              type: "string"
 *              description: "startDate"
 *            endDate:
 *              type: "string"
 *              description: "endDate"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/order', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.USER),RentRoomUserController.orderRentRoom);

/**
 * @openapi
 * /u/rent-room/{rentRoomId}:
 *   patch:
 *     tags:
 *      - "[USER]: Rent-Room"
 *     summary: Thay đổi thuê phòng
 *     parameters:
 *      - in: "path"
 *        name: "rentRoomId"
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin order room"
 *        schema:
 *          type: "object"
 *          properties:
 *            roomId:
 *              type: "string"
 *              description: "roomId"
 *            userId:
 *              type: "string"
 *              description: "userId"
 *            startDate:
 *              type: "string"
 *              description: "startDate"
 *            endDate:
 *              type: "string"
 *              description: "endDate"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.patch('/:rentRoomId', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.USER),RentRoomUserController.changeRentRoom);

/**
 * @openapi
 * /u/rent-room/{rentRoomId}:
 *   delete:
 *     tags:
 *      - "[USER]: Rent-Room"
 *     summary: Hủy đặt phòng
 *     parameters:
 *      - in: "path"
 *        name: "rentRoomId"
 *        type: "string"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.patch('/:rentRoomId', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.USER),RentRoomUserController.removeRentRoom);
export default router;
// /, passport.authenticate('jwt', { session: false })