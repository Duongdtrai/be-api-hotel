"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Room_1 = require("../../models/Room");
const i18n_1 = require("../../utils/i18n");
const notification = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const i18n = yield i18n_1.default.init();
    return i18n.t(key);
});
class RoomUserController {
    getRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = req.query.limit ? Number(req.query.limit) : 12;
            const page = req.query.page ? Number(req.query.page) : 1;
            try {
                const totalRoom = yield Room_1.default.find().count();
                const rooms = yield Room_1.default.find({
                    $or: [
                        { description: req.query.freeWord ? { $regex: req.query.freeWord } : { $exists: true } },
                        { title: req.query.freeWord ? { $regex: req.query.freeWord } : { $exists: true } },
                    ],
                    page: req.query.page ? req.query.page : '1',
                    limit: req.query.limit ? req.query.limit : '12',
                    price: {
                        $gte: req.query.priceStart ? Number(req.query.priceStart) : 0,
                        $lte: req.query.priceEnd ? Number(req.query.priceEnd) : 1000,
                    },
                    type: req.query.type && req.query.type !== 'all' ? req.query.type : { $exists: true },
                }).skip(limit * (page - 1)).limit(limit);
                res.status(200).json({
                    message: yield notification('success'),
                    data: rooms,
                    pagination: {
                        page,
                        limit,
                        total: totalRoom,
                    },
                });
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
    getSingleRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield Room_1.default.findOne({ _id: req.params.roomId });
                if (!_.isEmpty(room)) {
                    res.status(200).json({
                        message: yield notification('success'),
                        data: room,
                    });
                }
                else {
                    res.status(404).json({
                        message: yield notification('error'),
                    });
                }
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
}
exports.default = new RoomUserController();
//# sourceMappingURL=Room.js.map