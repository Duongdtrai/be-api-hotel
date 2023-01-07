import { Router } from 'express'
import RoomUserController from '../../controllers/user/Room'
import * as passport from 'passport'
import '../../middlewares/passport'
import checkIsInRole from '../../middlewares/role'
import { CONFIG } from '../../configs/configs'
const router = Router();
/**
 * @openapi
 * /u/room:
 *   get:
 *     tags:
 *      - "[USER]: room"
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
router.get('/', RoomUserController.getRooms);
/**
 * @openapi
 * /u/room/{roomId}:
 *   get:
 *     tags:
 *      - "[USER]: room"
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
router.get('/:roomId', passport.authenticate('jwt', { session: false }), checkIsInRole(CONFIG.role.USER), RoomUserController.getSingleRoom);
export default router;