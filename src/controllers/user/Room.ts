import { Request, response, Response } from "express";
import RoomModel from '../../models/room';
import * as _ from 'lodash'
import I18n from '../../utils/i18n'

const notification = async (key?: string) => {
    const i18n = await I18n.init()
    return i18n.t(key)
}
class RoomUserController {

    public async getRooms(req: Request, res: Response) {
        let limit: number = req.query.limit ? Number(req.query.limit) : 12
        let page: number = req.query.page ? Number(req.query.page) : 1
        try {
            const totalRoom = await RoomModel.find().count()
            const rooms = await RoomModel.find({
                $or: [
                    { description: req.query.freeWord ? { $regex: req.query.freeWord } : { $exists: true } },
                    { title: req.query.freeWord ? { $regex: req.query.freeWord } : { $exists: true } }
                ],
                page: req.query.page ? req.query.page : "1",
                limit: req.query.limit ? req.query.limit : "12",
                price: {
                    $gte: req.query.priceStart ? Number(req.query.priceStart) : 0,
                    $lte: req.query.priceEnd ? Number(req.query.priceEnd) : 1000
                },
                type: req.query.type && req.query.type !== "all" ? req.query.type : { $exists: true }
            }).skip(limit * (page - 1)).limit(limit)
            res.status(200).json({
                message: await notification('success'),
                data: rooms,
                pagination: {
                    page: page,
                    limit: limit,
                    total: totalRoom
                }
            });
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }
    public async getSingleRoom(req: Request, res: Response) {
        try {
            const room = await RoomModel.findOne({ _id: req.params.roomId });
            if (!_.isEmpty(room)) {
                res.status(200).json({
                    message: await notification('success'),
                    data: room
                })
            }
            else {
                res.status(404).json({
                    message: await notification('error'),
                })
            }
        } catch (error) {
            res.status(500).json(await notification('errorServer'))
        }
    }
}

export default new RoomUserController()












// const rooms = await RoomModel.find({
//     description: req.query.description ? req.query.description : { $exists: true },
//     title: req.query.title ? { $regex: req.query.title } : { $exists: true },
// })