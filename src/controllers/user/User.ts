import { Request, Response } from 'express';
import * as _ from 'lodash';
import UserModel from '../../models/user/user';
import I18n from '../../utils/i18n'
const notification = async (key?: string) => {
    const i18n = await I18n.init()
    return i18n.t(key)
}
class UserController {
    public async getSingleUser(req: Request, res: Response) {
        try {
            const user = await UserModel.findOne({ _id: req.params.userId })
            if (!_.isEmpty(user))
                res.status(200).json({ message: await notification('success'), data: user });
            else
                res.status(404).json(await notification('error'))
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }

    public async editUser(req: Request, res: Response) {
        try {
            const userEdit = await UserModel.findOne({ _id: req.params.userId })
            if (!userEdit) {
                const userData = await UserModel.updateOne({ _id: req.params.userId }, { ...req.body }, { runValidators: true });
                res.status(200).json({ message: await notification('success'), data: userData });
            } else {
                res.status(404).json("User not found")
            }
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }

}

export default new UserController()