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
const RentRoom_1 = require("../../models/user/RentRoom");
const i18n_1 = require("../../utils/i18n");
const notification = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const i18n = yield i18n_1.default.init();
    return i18n.t(key);
});
class RentRoomUserController {
    getListRentRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRentRoom = yield RentRoom_1.default.find({ userId: req.query.userId });
                res.status(200).json({
                    message: yield notification('success'),
                    data: userRentRoom,
                });
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
    orderRentRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findRentRoomId = yield RentRoom_1.default.findOne({
                    roomId: req.body.roomId,
                    startDate: req.body.startDate,
                    endDate: req.body.startDate,
                });
                if (_.isEmpty(findRentRoomId)) {
                    yield RentRoom_1.default.create(Object.assign({}, req.body));
                    res.status(200).json({
                        message: yield notification('success'),
                        data: Object.assign({}, req.body),
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
    changeRentRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield RentRoom_1.default.updateOne(Object.assign({ _id: req.params.rentRoomId }, req.body));
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
    removeRentRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield RentRoom_1.default.remove({
                    _id: req.params.rentRoomId,
                });
                res.status(200).json({
                    message: yield notification('success'),
                });
            }
            catch (error) {
                res.status(500).json(yield notification('errorServer'));
            }
        });
    }
}
exports.default = new RentRoomUserController();
//# sourceMappingURL=RentRoom.js.map