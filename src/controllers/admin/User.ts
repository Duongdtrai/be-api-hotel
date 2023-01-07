import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import * as _ from 'lodash';
import I18n from '../../utils/i18n'
import UserModel from '../../models/user/user';
import AccountModel from '../../models/account';

const notification = async (key?: string) => {
    const i18n = await I18n.init()
    return i18n.t(key)
}
class UserController {

    public async getUsers(req: Request, res: Response) {
        let limit: number = req.query.limit ? Number(req.query.limit) : 12
        let page: number = req.query.page ? Number(req.query.page) : 1
        try {
            const totalUser = await UserModel.find().count()
            const users = await UserModel.find({
                $or: [
                    { fullName: req.query.freeWord ? { $regex: req.query.freeWord } : { $exists: true } },
                    { address: req.query.freeWord ? { $regex: req.query.freeWord } : { $exists: true } },
                    { phone: req.query.freeWord ? { $regex: req.query.freeWord } : { $exists: true } },
                ],
                page: req.query.page ? req.query.page : "1",
                limit: req.query.limit ? req.query.limit : "12",
            }).skip(limit * (page - 1)).limit(limit)
            res.status(200).json({
                message: await notification('success'),
                data: users,
                pagination: {
                    page: page,
                    limit: limit,
                    total: totalUser
                }
            });
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }
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
    // public async createUser(req: Request, res: Response) {
    //     let bodyUser = req.body
    //     try {
    //         const userAccount = await UserModel.findOne({ email: bodyUser.email })
    //         if (!_.isEmpty(userAccount)) {
    //             let salt = await bcrypt.genSaltSync(10);
    //             let password = await bcrypt.hashSync(String(bodyUser.password), salt);
    //             delete bodyUser.password
    //             // add informationUser to table "users"
    //             const newUser = await UserModel.create({ ...bodyUser, status: 'inactive', role: 'user' });
    //             console.log(newUser);
    //             // add account to table "account"
    //             await AccountModel.create({
    //                 id: newUser._id,
    //                 email: bodyUser.email,
    //                 password: password,
    //                 role: 'user',
    //             });
    //             res.status(200).json({ message: await notification('success'), data: newUser });

    //         } else {
    //             res.status(404).json(await notification('validatorEmail'))
    //         }
    //     } catch (error) {
    //         res.status(500).json(await notification('errorServer'))
    //     }
    // }

    public async editUser(req: Request, res: Response) {
        try {
            const userEdit = await UserModel.findOne({ _id: req.params.userId })
            if (!_.isEmpty(userEdit)) {
                const userData = await UserModel.updateOne(
                    { _id: req.params.userId }, { ...req.body }, { runValidators: true }
                );
                res.status(200).json({ message: await notification('success'), data: userData });
            } else {
                res.status(404).json("User not found")
            }
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }

    public async removeUser(req: Request, res: Response) {
        try {
            await UserModel.remove({ _id: req.params.userId })
            await AccountModel.remove({ id: req.params.userId })
            res.status(200).json(await notification('success'))
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }
}

export default new UserController()