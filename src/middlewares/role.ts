import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken';
const checkIsInRole = (role) => (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['authorization'].split(' ')[1];
    let user = jwt.verify(token, process.env.SECRET_OR_KEY);
    if (user.role !== role) {
        return res.status(404).json({ message: 'Quyền không đúng' })
    }
    return next()
}
export default checkIsInRole
