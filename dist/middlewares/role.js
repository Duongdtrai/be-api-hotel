"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const checkIsInRole = (role) => (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.SECRET_OR_KEY);
    if (user.role !== role) {
        return res.status(404).json({ message: 'Quyền không đúng' });
    }
    return next();
};
exports.default = checkIsInRole;
//# sourceMappingURL=role.js.map