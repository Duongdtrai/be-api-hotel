import { Request, response, Response } from "express";
import RentRoomModel from '../../models/user/RentRoom';
import I18n from '../../utils/i18n'
import * as _ from 'lodash';
const notification = async (key?: string) => {
    const i18n = await I18n.init()
    return i18n.t(key)
}
class RentRoomUserController {

    public async getListRentRooms(req: Request, res: Response) {
        try {
            const userRentRoom = await RentRoomModel.find({ userId: req.query.userId });
            res.status(200).json({
                message: await notification('success'),
                data: userRentRoom
            });
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }
    public async orderRentRoom(req: Request, res: Response) {
        try {
            const findRentRoomId = await RentRoomModel.findOne({
                roomId: req.body.roomId,
                startDate:  req.body.startDate,
                endDate: req.body.startDate
            });
            if (_.isEmpty(findRentRoomId)) {
                await RentRoomModel.create({
                    ...req.body
                });
                res.status(200).json({
                    message: await notification('success'),
                    data: {
                        ...req.body
                    }
                });
            } else {
                res.status(404).json({
                    message: await notification('error'),
                })
            }
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }
    public async changeRentRoom(req: Request, res: Response) {
        try {
            await RentRoomModel.updateOne({
                _id: req.params.rentRoomId,
                ...req.body,
            })
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }

    public async removeRentRoom(req: Request, res: Response) {
        try {
            await RentRoomModel.remove({
                _id: req.params.rentRoomId,
            })
            res.status(200).json({
                message: await notification('success'),
            })

        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }
}

export default new RentRoomUserController()