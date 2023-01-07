import { Request, Response } from 'express';
import AccountModel from '../models/account';
import UserModel from '../models/user/user'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as _ from 'lodash'
import { CONFIG } from '../configs/configs'
import I18n from '../utils/i18n'
import SendMailer from './../utils/mailer'
// function i18n
const notification = async (key?: string) => {
    const i18n = await I18n.init()
    return i18n.t(key)
}


class AccountController {
    constructor() {
    }

    public async loginAccount(req: Request, res: Response) {
        let bodyUser = req.body
        try {
            const userAccount = await AccountModel.findOne({ email: bodyUser.email })
            console.log(userAccount);
            if (!_.isEmpty(userAccount)) {
                // so sánh password và password mã hóa
                const checkPassword = await bcrypt.compareSync(String(bodyUser.password), userAccount.password)
                console.log(checkPassword);

                if (checkPassword) {
                    let token = jwt.sign({ id: userAccount.id, role: userAccount.role }, process.env.SECRET_OR_KEY);
                    console.log(token);
                    res.status(200).json({ message: await notification("success"), token: token });
                } else {
                    res.status(404).json(await notification('validatorPassword'))
                }
            } else {
                res.status(404).json(await notification('validatorEmail'))
            }
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }
    public async registerAccount(req: Request, res: Response) {
        let bodyUser = req.body
        console.log(bodyUser);
        try {
            const userAccount = await AccountModel.findOne({ email: bodyUser.email })
            console.log(userAccount);
            
            if (_.isEmpty(userAccount)) {
                // mã hóa password
                let salt = await bcrypt.genSaltSync(10);
                let password = await bcrypt.hashSync(String(bodyUser.password), salt);
                delete bodyUser.password
                // add informationUser to table "users"
                const newUser = await UserModel.create({ ...bodyUser, status: 'inactive', role: 'user' });
                console.log(newUser);
                // add account to table "account"
                await AccountModel.create({
                    id: newUser._id,
                    email: bodyUser.email,
                    password: password,
                    role: 'user',
                });
                res.status(200).json({ message: await notification('success'), data: newUser });

            } else {
                res.status(404).json(await notification('validatorEmail'))
            }
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }
    public async changePassword(req: Request, res: Response) {
        try {
            const userAccount = await AccountModel.findOne({ id: req.query.id })
            console.log(userAccount);

            const checkPassword = await bcrypt.compareSync(String(req.body.password), userAccount.password)
            if (checkPassword) {
                let salt = await bcrypt.genSaltSync(10);
                let password = await bcrypt.hashSync(String(req.body.newPassword), salt);
                await AccountModel.updateOne({ id: req.query.id }, { password: password })
                res.status(200).json({ message: await notification("success") });
            } else {
                // mật khẩu chưa trùng khớp với mật khẩu cũ
                res.status(404).json(await notification('validatorPassword'))
            }
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }
    public async forgotPassword(req: Request, res: Response) {
        if (!req.body.email) { // không tìm thấy email
            res.redirect('/login')
        } else {
            try {
                const account = await AccountModel.findOne({ email: req.body.email })
                if (_.isEmpty(account.email)) {
                    res.redirect('/login')
                }
                else {
                    // id của table account
                    let token = await jwt.sign({ _id: account._id, }, process.env.SECRET_OR_KEY);
                    await AccountModel.updateOne({ _id: account._id }, { resetPasswordToken: token })
                    SendMailer(account.email, "Forgot password", `<a href="${process.env.APP_URL}/forgot-password/?token=${token}">Reset Password</a>`)
                    res.status(200).json({ message: await notification('success'), data: token });
                }
            } catch (error) {
                res.status(500).json(await notification('errorServer'))
            }
        }
    }

    public async verifyAccount(req: Request, res: Response) {
        try {
            const token = req.query.token
            let tokenData = jwt.verify(token, process.env.SECRET_OR_KEY);
            const account = await AccountModel.findOne({ _id: tokenData._id })
            if (_.isEmpty(account)) {
                res.redirect('/login')
            } else {
                if (token === account.resetPasswordToken) {
                    let salt = await bcrypt.genSaltSync(10);
                    let password = await bcrypt.hashSync(String(req.body.password), salt);
                    const responsePassword = await AccountModel.updateOne({ _id: account._id }, { resetPasswordToken: new Date(), password: password })
                    res.status(200).json({ message: await notification('success'), data: responsePassword });
                } else {
                    res.redirect('/login')
                }
            }
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }

    }
}

export default new AccountController()