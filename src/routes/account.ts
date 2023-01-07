import { Router } from 'express'
import AccountController from '../controllers/Account'
const router = Router();
/**
 * @openapi
 * /session/login:
 *   post:
 *     tags:
 *      - "[LOGIN]: account"
 *     summary: Đăng nhập
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin user"
 *        schema:
 *          type: "object"
 *          properties:
 *            email:
 *              type: "string"
 *              description: "email"
 *            password:
 *              type: "string"
 *              description: "password"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/login', AccountController.loginAccount);

/**
 * @openapi
 * /session/register:
 *   post:
 *     tags:
 *      - "[LOGIN]: account"
 *     summary: Đăng ký user
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Đăng ký user"
 *        schema:
 *          type: "object"
 *          properties:
 *            fullName:
 *              type: "string"
 *              description: "Tên người dùng"
 *            email:
 *              type: "string"
 *              description: "Email người dùng"
 *            password:
 *              type: "string"
 *              description: "duong dan anh"
 *            phone:
 *              type: "string"
 *              description: "Số điện thoại người dùng"
 *            address:
 *              type: "string"
 *              description: "Địa chỉ người dùng"
 *            role:
 *              type: "string"
 *              description: "Role người dùng"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/register', AccountController.registerAccount);

/**
 * @openapi
 * /session/forgot-password:
 *   post:
 *     tags:
 *      - "[LOGIN]: account"
 *     summary: Xác thực email password
 *     parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin user"
 *        schema:
 *          type: "object"
 *          properties:
 *            email:
 *              type: "string"
 *              description: "email"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.post('/forgot-password', AccountController.forgotPassword);

/**
 * @openapi
 * /session/change-password:
 *   patch:
 *     tags:
 *      - "[LOGIN]: account"
 *     summary: Thay đổi password
 *     parameters:
 *      - in: "query"
 *        name: "id"
 *        description: "id người dùng"
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin email và password"
 *        schema:
 *          type: "object"
 *          properties:
 *            password:
 *              type: "string"
 *              description: "password"
 *            newPassword:
 *              type: "string"
 *              description: "newPassword"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.patch('/change-password', AccountController.changePassword);


/**
 * @openapi
 * /session/verify-account:
 *   post:
 *     tags:
 *      - "[LOGIN]: account"
 *     summary: Verify account
 *     parameters:
 *      - in: "query"
 *        name: "token"
 *        type: "string"
 *      - in: "body"
 *        name: "body"
 *        description: "Thông tin password mới"
 *        schema:
 *          type: "object"
 *          properties:
 *            password:
 *              type: "string"
 *              description: "password"
 *     responses:
 *       200:
 *         description: "OK"
 *       500:
 *         description: "Internal error"
 *     security:
 *      - Bearer: []
 */
router.get('/verify-account', AccountController.verifyAccount);
export default router;